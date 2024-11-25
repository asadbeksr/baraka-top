export const telegramConfig = {
  // Routes where the navbar should be hidden
  hideNavbarRoutes: [
    '/telegram/stations/',  // Single station pages
    // Add more routes here as needed
    // Example: '/telegram/profile/',
  ],

  // Function to check if navbar should be hidden for current route
  shouldHideNavbar: (pathname: string) => {
    return telegramConfig.hideNavbarRoutes.some(route => pathname?.includes(route));
  }
};
