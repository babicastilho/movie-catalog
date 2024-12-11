/**
 * icons.ts
 * Configures the Font Awesome library by adding specific icons to the library.
 *
 * This file ensures that the required Font Awesome icons are globally available in the application.
 * It also logs a confirmation message in development environments for easier debugging.
 *
 * @imports library - Font Awesome library to register icons.
 * @imports icons - Selected icons from Font Awesome's solid and brand collections.
 *
 * @exports - The library setup is automatically utilized when this file is imported.
 */

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faUser,
  faCog,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

// Add the selected icons to the Font Awesome library
library.add(faHome, faUser, faCog, faGithub, faLinkedin, faSun, faMoon);

// Confirmation message in development environments
if (process.env.NODE_ENV === "development") {
  console.log("Font Awesome configured successfully!");
}
