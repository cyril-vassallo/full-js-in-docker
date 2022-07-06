const express = require("express");
const router = express.Router();

/**
 * GET request to /authors
 */
router.get("/", (req, res, next) => {
  res.status(200).json({
    persons: [
      {
        name: "Cyril Vassallo",
        job: "Web Developer",
        intro:
          "I've tried Tailwindcss and it is fun and very powerful, discover here my pre-configured Next-js and Tailwindcss boiler plate in docker container",
        photo: "/images/cyril-vassallo.JPG",
      },
      {
        name: "Sarah Dayan",
        job: "Web Developer",
        intro:
          "Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to customize, adapts to any design, and the build size is tiny.",
        photo: "/images/sarah-dayan.jpg",
      },
      {
        name: "Grafiart",
        job: "Web Developer",
        intro:
          "See my Tailwindcss tutorial on  you tube : https://www.youtube.com/watch?v=D6-g6JgiUIs",
        photo: "/images/grafikart.jpg",
      },
      {
        name: "John Doe",
        job: "undefined",
        intro:
          "I have been notice in million of code line just because nobody know who i am",
        photo: "/images/john-doe.png",
      },
    ],
    to_nextjs: "http://localhost:3000/persons",
  });
});

/**
 * GET request to /author/:id
 */
router.get("/:id", (req, res, next) => {
  res.status(200).json({
    message: `author with id: ${req.params.id} was fetch, you can change the id in the url, all values accepted`,
    id: req.params.id,
  });
});

module.exports = router;
