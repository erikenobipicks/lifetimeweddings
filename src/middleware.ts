import { defineMiddleware } from 'astro:middleware';
import { getUser } from '~/lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname;
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const user = await getUser(context.cookies);
    if (!user) {
      return context.redirect('/admin/login');
    }
    context.locals.user = user;
  }
  return next();
});
