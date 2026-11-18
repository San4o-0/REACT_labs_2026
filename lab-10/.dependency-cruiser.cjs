// Правила структур §4.4–§4.6 і §4.9 для dependency-cruiser: npm run check:deps.
// Правило перевіряє лише теки, які вже є: поки теки routes/ немає, правило
// про маршрути нічого не знаходить. Тому один файл служить для всіх
// структур. Не змінюйте цей файл: це умова задачі, як і tests/.

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      comment:
        'Циклічний імпорт: модулі імпортують один одного, напряму або через інші.',
      from: {},
      to: { circular: true },
    },
    {
      name: 'routes-are-independent',
      severity: 'error',
      comment:
        'Тека маршруту чи сторінки не імпортує теку іншого маршруту чи сторінки. ' +
        'Те, що потрібно двом, переносьте в спільну теку (§4.4–§4.6).',
      from: { path: '^src/(routes|pages|app/routes)/([^/]+)/' },
      to: { path: '^src/$1/[^/]+/', pathNot: '^src/$1/$2/' },
    },
    {
      name: 'features-are-independent',
      severity: 'error',
      comment:
        'Функціональність (feature) не імпортує іншу. Їх поєднує сторінка ' +
        'або маршрут, що стоїть вище (§4.5, §4.6).',
      from: { path: '^src/features/([^/]+)/' },
      to: { path: '^src/features/', pathNot: '^src/features/$1/' },
    },
    {
      name: 'shared-stays-shared',
      severity: 'error',
      comment:
        'Спільний код не знає, хто ним користується: shared/, components/, ' +
        'hooks/, lib/, stores/ і utils/ не імпортують app/, routes/, pages/, ' +
        'widgets/, features/ і entities/ (§4.4–§4.6).',
      from: { path: '^src/(shared|components|hooks|lib|stores|utils)/' },
      to: { path: '^src/(app|routes|pages|widgets|features|entities)/' },
    },
    {
      name: 'app-on-top',
      severity: 'error',
      comment:
        'app/ — верхній шар: він імпортує все інше, а його не імпортує ніхто (§4.4–§4.6).',
      from: { path: '^src/', pathNot: '^src/app/' },
      to: { path: '^src/app/' },
    },
    {
      name: 'packages-are-independent',
      severity: 'error',
      comment: 'Пакет не імпортує застосунок (§4.9).',
      from: { path: '^packages/' },
      to: { path: '^src/' },
    },
    {
      name: 'no-deep-imports-into-packages',
      severity: 'error',
      comment:
        'Застосунок імпортує пакет лише за назвою (@coffee/cart), а не шляхом до файлу всередині пакета (§4.9).',
      from: { path: '^src/' },
      to: { path: '^packages/', pathNot: '^packages/[^/]+/index\\.js$' },
    },
    {
      name: 'not-reachable-from-main',
      severity: 'warn',
      comment:
        'Цей файл не імпортує ніхто, починаючи з main.jsx: мертвий код. ' +
        'Файл, який ще реекспортує index.js, сюди не потрапить.',
      from: { path: 'main\\.jsx$' },
      to: {
        path: '^src/',
        pathNot: ['main\\.jsx$', '\\.css$'],
        reachable: false,
      },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
  },
}
