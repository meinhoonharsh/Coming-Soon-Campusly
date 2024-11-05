function blowConfetti() {
  // play pop.mp3 sound
  var audio = new Audio("pop.mp3");
  audio.play();

  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

const { createClient } = supabase;

const basepath = "https://nehfwedvypqzkxctviiw.supabase.co";
const key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5laGZ3ZWR2eXBxemt4Y3R2aWl3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyODE1MjQyMSwiZXhwIjoyMDQzNzI4NDIxfQ.5LO-ET_RnkrIvWvcDyS1B9lm2q9ty7UsRLfUttvloaw";

const _supabase = createClient(basepath, key);

// submitBtn = document.getElementById("formsubmit");
// submitBtn.addEventListener("click", async (e) => {

document
  .getElementById("waitlist_form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;
    const college = document.getElementById("college").value;

    const { data, error } = await _supabase
      .from("waitlist_users")
      .insert([{ name, email, contact, college }]);

    if (error) {
      alert("An error occurred. Please try again later.");
    } else {
      blowConfetti();
      document.querySelector(".success-msg-container").style.display = "flex";

      document.getElementById("waitlist_form").reset();

      document.getElementById("close-modal").addEventListener("click", () => {
        document.querySelector(".success-msg-container").style.display = "none";
      });
    }
  });
