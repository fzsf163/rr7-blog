import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("routes/homeLayout.tsx", [
    index("./routes/home._index.tsx"),
    route("about", "./routes/about.tsx"),
    route("request", "./routes/request.tsx"),
    route("blogs/:slug", "./routes/blogs_.$slug.tsx"),
    route("blog/:slug", "./routes/blog.$slug.tsx"),
    route("blogs", "./routes/blogs.tsx"),
  ]),

  // search route
  route("api/search", "./routes/api.search.tsx"),

  route("admin", "./routes/_admin.tsx", [
    route("dashboard", "./routes/_admin.dashboard.tsx"),
    route("homeOptions", "./routes/_admin.homeOptions.tsx"),
    route("aboutOptions", "./routes/_admin.aboutOptions.tsx"),
    route("requestOptions", "./routes/_admin.requestOptions.tsx"),
    route("createBlog", "./routes/_admin.createBlog.tsx"),
    route("settings", "./routes/_admin.settings.tsx"),
    route("edit/:slug", "./routes/_admin.editBlog.$slug.tsx"),
  ]),
  route("login", "./routes/_auth.login.tsx"),
  route("auth", "./routes/admin.tsx"),

  // ...prefix("admin", [route("dashboard", "./routes/_admin.dashboard.tsx")]),
] satisfies RouteConfig;

// export default remixRoutesOptionAdapter((defineRoutes) => {
//   return defineRoutes((route) => {
//     route("/", "routes/homeLayout.tsx", () => {
//       route("/", "routes/home._index.tsx", { index: true });
//       route("about", "routes/about.tsx");
//       route("request", "routes/request.tsx");
//       route("blogs/:slug", "routes/blogs_.$slug.tsx");
//       route("blog/:slug", "routes/blog.$slug.tsx");
//       route("blogs", "routes/blogs.tsx");
//     });
//     route("admin", "routes/_admin.tsx", () => {
//       route("dashboard", "routes/_admin.dashboard.tsx");
//     });
//     route("login", "routes/_auth.login.tsx");
//     route("auth", "routes/admin.tsx");
//   });
// }) satisfies RouteConfig;
