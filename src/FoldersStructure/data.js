const root = {
  files: ["r1.txt", "r2.txt", "r3.txt", "r4.txt", "r5.txt"],
  apple: {
    files: ["a1.txt", "a2.txt", "a3.txt", "a4.txt"],
    appleBanana: {
      name: "appleBanana",
      files: ["ab1", "ab2", "ab3", "ab4"],
      appleBananaCherry: {
        name: "appleBananaCherry",
        files: ["abc1", "abc2", "abc3", "abc4"],
      },
    },
    appleCherry: {
      name: "appleCherry",
      files: ["ac1", "ac2", "ac3", "ac4"],
    },
  },
  banana: {
    files: ["b1", "b2", "b3", "b4"],
  },
};

export const files = {
  name: "root",
  isFolder: true,
  children: [
    {
      name: "src",
      isFolder: true,
      children: [
        {
          name: "App.js",
          isFolder: false,
        },
        {
          name: "Folder.js",
          isFolder: false,
        },
        {
          name: "data.js",
          isFolder: false,
        },
        {
          name: "Index.js",
          isFolder: false,
        },
        {
          name: "styles.css",
          isFolder: false,
        },
      ],
    },
    {
      name: "public",
      isFolder: true,
      children: [
        {
          name: "index.html",
          isFolder: false,
        },
        {
          name: "styles.css",
          isFolder: false,
        },
      ],
    },
    {
      name: "package.json",
      isFolder: false,
    },
  ],
};
