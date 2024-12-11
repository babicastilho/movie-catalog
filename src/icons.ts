import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHome,
  faUser,
  faCog,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

// Adicione os ícones à biblioteca do Font Awesome
library.add(faHome, faUser, faCog, faGithub, faLinkedin, faSun, faMoon);

// Mensagem de confirmação no ambiente de desenvolvimento
if (process.env.NODE_ENV === "development") {
  console.log("Font Awesome configured successfully!");
}
