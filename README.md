# 🎬 **Movie Catalog**

**Movie Catalog** is a Vue.js application that allows users to browse, view, and explore detailed movie information. Inspired by the **Personal Task Tracker** layout in Jira, the project includes a responsive design, dynamic components, and **dark/light mode** support.

---

## 🚀 **Key Features**

- **Movie List**: Displays a catalog of movies with posters and brief overviews.
- **Movie Details**: View detailed information about each movie, including the cast, genres, and release date.
- **Search Functionality**: A floating action button (FAB) triggers a search overlay for movies.
- **Pagination**: Optimized movie list display with pagination.
- **Dark/Light Mode**: Seamlessly switches between light and dark themes for improved accessibility.
- **Responsive Navigation**: A sidebar for easy navigation, visible on large screens and collapsible on smaller screens.
- **Interactive UI**: Smooth hover effects, transitions, and a clean layout.
- **Mobile-First Design**: Optimized for both mobile and desktop screens.

---

## 🛠️ **Technologies Used**

- **Frontend**: Vue.js (v3), Vuex, Vue Router  
- **Styling**: Tailwind CSS, Scoped CSS  
- **Icons**: FontAwesome  
- **Responsive Design**: Mobile-first approach  
- **State Management**: Vuex  
- **Routing**: Vue Router  

---

## ⚙️ **Setup Instructions**

Follow these steps to set up and run the project locally:

### **1. Clone the Repository**

```bash
git clone https://github.com/babicastilho/movie-catalog.git
cd movie-catalog
```

### **2. Install Dependencies**

```bash
yarn install
```
### **3. Start the Development Server**

```bash
yarn serve
```

---

## 🗂️ **Project Structure**

```plaintext
src/
├── assets/                # Static assets like images
├── components/            # Reusable components (Header, Footer, Sidebar, etc.)
├── views/                 # Main pages (Home, MovieList, MovieDetails)
├── store/                 # Vuex store for state management
├── router/                # Vue Router configuration
├── icons.ts               # FontAwesome icons configuration
├── App.vue                # Root Vue component
└── main.ts                # Project entry point
```

---

## 🌟 **Technical Highlights**

### **1. Responsive Sidebar**
- **Large Screens**: Always visible on large devices.
- **Small Screens**: Collapsible sidebar toggled via a button.

### **2. Movie Cards**
- Movie cards display posters, titles, and overviews.
- Includes hover effects with image opacity transitions.
- Styled **"View More"** button for navigation to movie details.

### **3. Dark/Light Mode**
- Implemented using Tailwind CSS with `dark` mode classes.
- Provides strong color contrast to ensure accessibility.

### **4. Pagination**
- Pagination enables a clean and organized movie list display.

---

## 📈 **Future Improvements**

- **Genre Expansion**: Expand the project to include filters for all available movie genres.
- **Search Enhancements**: Improve search functionality with filters for genres and ratings.
- **Movie Recommendations**: Display related movies or recommendations based on the current selection.

---

## 📝 **License**

This project is licensed under the **MIT License**. For more details, see the [LICENSE](LICENSE) file.

---

## 🔗 **Useful Links**

- [GitHub Repository](https://github.com/babicastilho/movie-catalog)  
- [Vue.js Documentation](https://vuejs.org/)  
- [Tailwind CSS Documentation](https://tailwindcss.com/)  
- [FontAwesome Icons](https://fontawesome.com/)  

---

## 🤝 **Contributing**

Contributions are welcome! To contribute:

1. Fork the repository.  
2. Create a new branch: `git checkout -b feature/your-feature`.  
3. Commit your changes: `git commit -m "feat: add your feature"`.  
4. Push to your branch: `git push origin feature/your-feature`.  
5. Open a Pull Request.

---

## 📄 **Acknowledgments**

Special thanks to Vue.js, Tailwind CSS, and FontAwesome for making this project possible.
