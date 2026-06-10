// Co-located loading UI for blog posts. Re-exports the root console loader so
// clicking into a post from the timeline reliably shows the loading screen
// while the async server component (MDX) compiles/renders.
export { default } from "../../loading";
