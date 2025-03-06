/**
 * Prerender is disabled until we update sveltekit to v2 or above.
 *
 * This is due to an issue where the dynamic env variables are not functioning
 * correctly when we have the node adapter + prerendering + dynamic env variables.
 *
 * The current workaround is to disable prerendering.
 * https://github.com/sveltejs/kit/issues/10008#issuecomment-1583252992
 * https://github.com/sveltejs/kit/pull/11277
 */
export const prerender = false;
