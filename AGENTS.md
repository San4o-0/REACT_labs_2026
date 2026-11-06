# AGENTS.md

Labs for the React course, one folder per lab. Each `lab-N/` folder is a
separate single-page app on React 19 and Vite 8, in JavaScript with JSX. No
TypeScript yet. User-facing text is in Ukrainian.

## Repository layout

- `lab-N/`: one lab, with its own `package.json`, ESLint and Prettier
  configuration
- `package.json` in the root: npm workspaces over the `lab-*` folders, so all
  labs share one `package-lock.json` and one `node_modules/`
- `AGENTS.md`, `.gitattributes`, `.gitignore`, `.vscode/`: shared by all labs

## Commands

Run `npm install` in the repository root. Run every other command inside the
lab's folder, for example `lab-1/`:

- `npm run dev`: dev server at http://localhost:5173
- `npm run lint`: ESLint
- `npm run format`: format the lab's files with Prettier
- `npm run format:check`: check formatting without changing files
- `npm run build`: production build into the lab's `dist/`

A task is done only when `npm run lint`, `npm run format:check` and
`npm run build` pass in the lab's folder. Run all three and report their
results.

## Scope

- Work only in the folder of the lab the task names. If the task doesn't name
  a lab, ask.
- Don't change other labs' folders, and don't import code from one lab into
  another.

## Lab structure

- `index.html`: the page Vite serves; the app mounts into `<div id="root">`
- `src/main.jsx`: entry point; renders `<App />` inside `<StrictMode>`
- `src/App.jsx`: root component
- `src/components/`: one component per file, named in PascalCase
  (`ProfileCard.jsx`)
- `public/`: static files, copied to the build as is

## React rules

- Function components and hooks only. No class components.
- Use current React 19 APIs: `createRoot`, not `ReactDOM.render`. No
  `propTypes`, and no `defaultProps` on function components (use default
  parameter values instead).
- Follow the Rules of Hooks: call hooks only at the top level of a component
  or a custom hook, never in a condition, a loop or after an early return.
- Keep rendering pure. Compute values from props and state during render
  instead of copying them into state with `useEffect`.
- Give list items a stable `key` from the data, never the array index.
- Use semantic HTML: `<button>` for actions, `<a href>` for navigation, a
  `<label>` for every form field, `alt` on every `<img>`.
- Don't use `dangerouslySetInnerHTML`.

## Dependencies and configuration

- Don't add, remove or upgrade npm packages without asking first, and say why
  a package is needed. Install a package from inside the folder of the lab
  that needs it, never in the repository root.
- Don't run `npm audit fix --force`.
- Don't change the root `package.json`, or a lab's `eslint.config.js`,
  `.prettierrc.json`, `vite.config.js` or `package.json` scripts, unless the
  task is about them.
- Never turn off ESLint rules or add `eslint-disable` comments. Fix the cause.

## How to work

- Before editing, read the relevant files and list the files you will change.
- Keep each change small and limited to the task.
- After editing, summarise what changed and show the check results.
- Never put secrets (API keys, tokens, passwords) in the code. Every
  `VITE_*` variable ends up in the public bundle.
