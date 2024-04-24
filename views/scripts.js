document.addEventListener("DOMContentLoaded", () => {
  const toggleRepliesBtns = document.querySelectorAll(".toggle-replies-btn");

  toggleRepliesBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const repliesSection = btn.nextElementSibling;
      console.log(repliesSection);
      if (repliesSection.classList.contains("hidden")) {
        repliesSection.classList.remove("hidden");
        btn.textContent = "Hide Replies";
      } else {
        repliesSection.classList.add("hidden");
        btn.textContent = "Show Replies";
      }
    });
  });
});
