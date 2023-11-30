# Next JS v12 monorepo Skeleton :seedling:

## Packages :tada:
|  Packages  |    Description   |
| ---------- | ---------------- |
| `consumer` | consumer section |
| `owner`    | owner section    |
| `shared`   | shared section   |

## How to get started ? :rocket:

- Create `.env` in the root directory taking `.env.example` as reference
- Install depenencies using `yarn bootstrap` command
- Start `app` using the `commands` below :arrow_heading_down:

## Commands :arrow_down:

|         Command            |            Description                    |
| -------------------------- | ----------------------------------------- |
| `yarn start`               | start all packages                        |
| `yarn bootstrap`           | install dependencies                      |
| `yarn package:owner`       | start only owner package                  |
| `yarn package:consumer`    | start only consumer package               |
| `yarn deploy:gae:owner`    | deploy owner package on google app engine |
| `yarn deploy:gae:consumer` | deploy consumer package on google app engine |
| `nextstart:consumer`       | runs build consumer package                  |
| `nextstart:owner`          | runs build owner package                     |
| `next:start`               | run all build package                        |
| `test`                     | run test                                     |
| `storybook`                | run storybook                                |
| `build-storybook`          | generate static web app for storybook        |

## Tech Stack :books:

|    Techs           |     Description         |
|------------------- | ----------------------- |
| `next-v12`         | Server Side Rendering   |
| `firebase-v9`      | Authentication          |  
| `react-query`      | Data fetching library   |  
| `circleci`         | CI / CD                 |  
| `typescript`       | Static typed PL         |  
| `eslint/prettier`  | Code formatting / linting      |  
| `axios`            | HTTP library                   |
| `i18next`          | Internationalization framework |
| `sentry`           | Error tracking                 |
| `formik`           | React form library             |
| `yup`              | object schema validation       |
| `styled-components`| CSS in JS                      |
| `ant-design`       | React UI library               |
| `lerna`            | Manage mono repositories       |


Happy coding :v:
