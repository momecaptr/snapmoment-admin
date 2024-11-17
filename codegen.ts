import {CodegenConfig} from '@graphql-codegen/cli'
const config: CodegenConfig = {
  schema: 'https://inctagram.work/api/v1/graphql', // УКазываем enpoint на schema файл, чтобы он подхватил для автоматической типизации
  documents: ['src/graphql/queries/**/*.ts'],// так показывал Толкачев
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'src/graphql/types.ts': { plugins: ['typescript'] }, // Так показывал Толкачев. Куда генерировать типы. То есть те типы, которые от запроса, перегенерировать в формат TypeScript
    // И дальше опять настройки Толкачева
    'src/graphql/': {
      preset: 'near-operation-file', // складывай сгенерированный файл рядом с тем откуда брал
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: 'types.ts' // Тут указываем откуда брать типы. И это src/graphql/types.ts
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'], // Дополнительная настройка через плагины. И ИХ ТОЖЕ НУЖНО УСТАНОВИТЬ
      config: {
        withHooks: true
      }
    }
  }
}
export default config