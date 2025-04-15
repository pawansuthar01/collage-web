if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(() => console.log("✅ Service Worker Registered"));
}
self.addEventListener("install", (event) => {
  console.log("✅ Service Worker Installed");
});

self.addEventListener("activate", (event) => {
  console.log("✅ Service Worker Activated");
});

self.addEventListener("fetch", (event) => {
  // Optional: You can add caching logic here later
});
