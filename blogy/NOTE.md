# Links
## Articles

[Storing React state in the URL with Next.js](https://francoisbest.com/posts/2023/storing-react-state-in-the-url-with-nextjs)
[How to add Tailwind Dark Mode to React Server Side Apps](https://michaelangelo.io/blog/darkmode-rsc)
[Accessible design](https://m3.material.io/foundations/accessible-design/accessibility-basics)
[Tailwind tricks that would make your development comfortable](https://medium.com/@serpentarium13/tailwind-tricks-that-would-make-your-development-comfortable-72930590dd06)
[](https://copyprogramming.com/howto/how-to-use-diferent-env-files-with-nextjs)
[RHF with server components](https://nehalist.io/react-hook-form-with-nextjs-server-actions/)

## Libs

[CVA, add variants to reusable components](https://cva.style/docs/getting-started/variants)
[Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
[Commit lint tuto](https://dev.to/mahmudulhsn/install-husky-in-your-project-for-proper-commit-lint-with-pre-commit-hooks-25b2)
[Shadcn](https://ui.shadcn.com/docs)
[next-intl tuto](https://phrase.com/blog/posts/next-js-app-router-localization-next-intl/)
[string-ts](https://github.com/gustavoguichard/string-ts)

## Repos

[Next 14 starter](https://github.com/Kiranism/next-shadcn-dashboard-starter)
[Shadcn tanstack table](https://github.com/sadmann7/shadcn-table)

### Emailing

[react-email with resend](https://react.email/docs/integrations/resend)
[Resend pricing](https://resend.com/settings) (free: 100 email/day (3000 email / month), paid: $20 / 50k email / month)
[Brevo pricing](https://www.brevo.com/pricing/)

### Utils

[Download Feather icons in svg format](https://feathericons.com/)

### Discussions
[React useFormState vs RHF built-in](https://www.reddit.com/r/nextjs/comments/18b8z71/how_to_use_reacthookform_with_nextjs_server/)
https://codesandbox.io/p/devbox/drawer-with-scale-forked-nx2glp?file=%2Fpackage.json

### husky

Issue with husky when the .git folder is in different place than packgage.json
https://github.com/typicode/husky/issues/851


# Config
## next-intel
To add new language:
- /config/i18n.ts
- /middleware.ts
- add new language translation in /translations

To add new translated routes:
- add the translated route to /config/routes.ts

# Lib usage
### React Hook Form
- We use React `useFormState` for server actions with `action` instead of `onSubmit`
- So this will use `FormData` instead of an `object`, this is utils when uploading a file for ex.


# Discussion
[Detect screen size in middleware](https://stackoverflow.com/questions/76155066/how-can-i-serve-a-static-page-with-responsive-design-in-next-js-without-affectin)