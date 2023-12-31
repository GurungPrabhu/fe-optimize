console.log("hello world");

// version: 2.1

// jobs:
//   # Job for build for other branches
//   build:
//     docker:
//       - image: cimg/node:19.3.0

//     working_directory: ~/frail

//     steps:
//       - checkout

//       - run:
//           name: Checking the Node.js version
//           command: |
//             node --version

//       - restore_cache:
//           keys:
//             - v1-dependencies-{{ checksum "yarn.lock" }}
//             - v1-dependencies-

//       - run:
//           name: Initializing dependencies
//           command: |
//             yarn bootstrap

//       - save_cache:
//           key: v1-npm-deps-{{ checksum "yarn.lock" }}
//           paths:
//             - ./node_modules

//       - run:
//           name: Build the packages
//           command: |
//             unset CI
//             yarn build:owner

//       - slack/status:
//           channel: ${SLACK_CHANNEL}
//           webhook: ${SLACK_WEBHOOK}
//           failure_message: ":red_circle: A $CIRCLE_JOB job has failed!"

//       - slack/notify-on-failure:
//           only_for_branches: develop

//   # circleci server 8 GB RAM
//   resource_class: medium

//   # build and deploy to development
//   build_and_deploy_to_develop:
//     docker:
//       - image: google/cloud-sdk

//     working_directory: ~/frail

//     steps:
//       - checkout

//       - node/install:
//           install-yarn: true
//           lts: true

//       - run:
//           name: Checking Node.JS version
//           command: |
//             node --version

//       - restore_cache:
//           keys:
//             - v1-dependencies-{{ checksum "yarn.lock" }}
//             - v1-dependencies-

//       - run:
//           name: Initializing dependencies
//           command: |
//             yarn bootstrap

//       - save_cache:
//           key: v1-npm-deps-{{ checksum "yarn.lock" }}
//           paths:
//             - ./node_modules

//       - run:
//           name: Initializing the Environment variables
//           command: |
//             echo "NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY
//             NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
//             NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID
//             NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
//             NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID
//             NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID
//             NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
//             NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
//             NEXT_PUBLIC_GOOGLE_API_KEY=$NEXT_PUBLIC_GOOGLE_API_KEY
//             OWNER_PORT=$OWNER_PORT
//             NEXT_PUBLIC_HARDCODED_EMAIL=$NEXT_PUBLIC_HARDCODED_EMAIL
//             NEXT_PUBLIC_BANK_BRANCHES=$NEXT_PUBLIC_BANK_BRANCHES
//             NEXT_PUBLIC_ENVIRONMENT=$NEXT_PUBLIC_ENVIRONMENT
//             NEXT_PUBLIC_APP_API_URL=$NEXT_PUBLIC_APP_API_URL" > .env

//       - run:
//           name: Authenticating and configuring the Google Cloud Platform
//           command: |
//             echo $GCLOUD_SERVICE_KEY | base64 --decode | gcloud auth activate-service-account --key-file=-
//             gcloud --quiet config set project ${GCLOUD_PROJECT_ID}
//             gcloud --quiet config set compute/zone ${GCLOUD_ZONE}

//       - run:
//           name: Build owner
//           command: |
//             unset CI
//             yarn build:gae:owner

//       - run:
//           name: Deploy owner
//           command: |
//             gcloud app deploy app_owner.yaml --project ${GCLOUD_PROJECT_ID} --quiet

//       - run:
//           name: Delete Old versions of owner Services in App Engine
//           command: |
//             versions=$(gcloud app versions list \
//               --service owner \
//               --sort-by '~VERSION.ID' \
//               --format 'value(VERSION.ID)' | sed 1,3d)
//             for version in $versions; do
//               gcloud app versions delete "$version" \
//                 --service owner \
//                 --quiet
//             done

//       - slack/status:
//           channel: ${SLACK_CHANNEL}
//           webhook: ${SLACK_WEBHOOK}
//           failure_message: ":red_circle: A $CIRCLE_JOB job has failed!"

//       - slack/notify-on-failure:
//           only_for_branches: develop

//     resource_class: medium

//   #build and deploy to staging
//   build_and_deploy_to_staging:
//     docker:
//       - image: google/cloud-sdk

//     working_directory: ~/frail

//     steps:
//       - checkout

//       - node/install:
//           install-yarn: true
//           lts: true

//       - run:
//           name: Checking Node.JS version
//           command: |
//             node --version

//       - restore_cache:
//           keys:
//             - v1-dependencies-{{ checksum "yarn.lock" }}
//             - v1-dependencies-

//       - run:
//           name: Initializing dependencies
//           command: |
//             yarn bootstrap

//       - save_cache:
//           key: v1-npm-deps-{{ checksum "yarn.lock" }}
//           paths:
//             - ./node_modules

//       - run:
//           name: Initializing the Environment variables
//           command: |
//             echo "NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY
//             NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
//             NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID
//             NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
//             NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID
//             NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID
//             NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
//             NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
//             NEXT_PUBLIC_GOOGLE_API_KEY=$NEXT_PUBLIC_GOOGLE_API_KEY
//             OWNER_PORT=$OWNER_PORT
//             NEXT_PUBLIC_APP_API_URL=$NEXT_PUBLIC_APP_API_URL" > .env

//       - run:
//           name: Authenticating and configuring the Google Cloud Platform
//           command: |
//             echo $GCLOUD_SERVICE_KEY | gcloud auth activate-service-account --key-file=-
//             gcloud --quiet config set project ${GCLOUD_PROJECT_ID}
//             gcloud --quiet config set compute/zone ${GCLOUD_ZONE}

//       - run:
//           name: Build owner
//           command: |
//             unset CI
//             yarn build:gae:owner

//       - run:
//           name: Deploy owner
//           command: |
//             gcloud app deploy app_owner.yaml --project ${GCLOUD_PROJECT_ID} --quiet

//       - slack/status:
//           channel: ${SLACK_CHANNEL}
//           webhook: ${SLACK_WEBHOOK}
//           failure_message: ":red_circle: A $CIRCLE_JOB job has failed!"

//       - slack/notify-on-failure:
//           only_for_branches: staging

//     resource_class: medium

//   # build_and_deploy_to_production
//   build_and_deploy_to_production:
//     docker:
//       - image: google/cloud-sdk

//     working_directory: ~/frail-front

//     steps:
//       - checkout

//       - node/install:
//           install-yarn: true
//           lts: true

//       - run:
//           name: Checking the Node.js version
//           command: |
//             node --version

//       - restore_cache:
//           keys:
//             - v1-dependencies-{{ checksum "yarn.lock" }}
//             - v1-dependencies-

//       - run:
//           name: Initializing dependencies
//           command: |
//             yarn bootstrap

//       - save_cache:
//           key: v1-npm-deps-{{ checksum "yarn.lock" }}
//           paths:
//             - ./node_modules

//       - run:
//           name: Initializing the Environment variables
//           command: |
//             echo "NEXT_PUBLIC_FIREBASE_API_KEY=$NEXT_PUBLIC_FIREBASE_API_KEY
//             NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=$NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
//             NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID
//             NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
//             NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID=$NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID
//             NEXT_PUBLIC_FIREBASE_APP_ID=$NEXT_PUBLIC_FIREBASE_APP_ID
//             NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=$NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
//             NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
//             NEXT_PUBLIC_GOOGLE_API_KEY=$NEXT_PUBLIC_GOOGLE_API_KEY
//             NEXT_PUBLIC_BANK_BRANCHES=$NEXT_PUBLIC_BANK_BRANCHES
//             OWNER_PORT=$OWNER_PORT
//             NEXT_PUBLIC_HARDCODED_EMAIL=$NEXT_PUBLIC_HARDCODED_EMAIL
//             NEXT_PUBLIC_APP_API_URL=$NEXT_PUBLIC_APP_API_URL" > .env

//       - run:
//           name: Authenticating and configuring the Google Cloud Platform
//           command: |
//             echo $GCLOUD_SERVICE_KEY | gcloud auth activate-service-account --key-file=-
//             gcloud --quiet config set project $GCLOUD_PROJECT_ID
//             gcloud --quiet config set compute/zone $GCLOUD_ZONE

//       - run:
//           name: Build the owner package
//           command: |
//             unset CI
//             yarn build:gae:owner

//       - run:
//           name: owner package Deployment
//           command: |
//             gcloud app deploy app_owner.yaml --project $GCLOUD_PROJECT_ID --quiet

//       - slack/status:
//           channel: ${SLACK_CHANNEL}
//           webhook: ${SLACK_WEBHOOK}
//           failure_message: ":red_circle: A $CIRCLE_JOB job has failed!"

//       - slack/notify-on-failure:
//           only_for_branches: production

//     resource_class: medium

// orbs:
//   slack: circleci/slack@3.4.2
//   # for secondary image dependencies to google cloud sdk
//   node: circleci/node@4.7.0

// workflows:
//   version: 2
//   build-workflow:
//     jobs:
//       - build:
//           context: frail-api-development
//           filters:
//             branches:
//               only:
//                 - develop
//                 - staging
//                 - master
//                 - /FC-.*/

//       - build_and_deploy_to_develop:
//           context: frail-api-development
//           filters:
//             branches:
//               only:
//                 - develop
//       - build_and_deploy_to_staging:
//           context: frail-check-staging
//           filters:
//             branches:
//               only:
//                 - staging
//       - build_and_deploy_to_production:
//           context: frail-production
//           filters:
//             tags:
//               only:
//                 - /v[0-9].*/
//             branches:
//               only:
//                 - production
//               ignore:
//                 - /.*/
