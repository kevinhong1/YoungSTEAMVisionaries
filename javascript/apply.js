document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("tutorApplication");
  const steps = form.querySelectorAll(".form-step");
  const progressBar = document.querySelector(".progress-bar");
  const stepIndicator = document.querySelector(".step-indicator");

  const emailInput = document.getElementById("email");
  const emailFeedback = emailInput.nextElementSibling; 

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    const disposableDomains = [
      "tempmail.com",
      "throwawaymail.com",
      "temp-mail.org",
      "guerrillamail.com",
      "sharklasers.com",
      "mailinator.com",
      "0-mail.com",
      "027168.com",
      "0815.ru",
      "0815.ry",
      "0815.su",
      "0845.ru",
      "0box.eu",
      "0clickemail.com",
      "0n0ff.net",
      "0nelce.com",
      "0v.ro",
      "0w.ro",
      "0wnd.net",
      "0wnd.org",
      "0x207.info",
      "1-8.biz",
      "1-tm.com",
      "10-minute-mail.com",
      "10-minuten-mail.de",
      "1000rebates.stream",
      "100likers.com",
      "105kg.ru",
      "10mail.com",
      "10mail.org",
      "10minut.com.pl",
      "10minut.xyz",
      "10minutemail.be",
      "10minutemail.cf",
      "10minutemail.co.uk",
      "10minutemail.co.za",
      "10minutemail.com",
      "10minutemail.de",
      "10minutemail.ga",
      "10minutemail.gq",
      "10minutemail.ml",
      "10minutemail.net",
      "10minutemail.nl",
      "10minutemail.pro",
      "10minutemail.us",
      "10minutemailbox.com",
      "10minutemails.in",
      "10minutenemail.de",
      "10minutesmail.com",
      "10minutesmail.fr",
      "10minutmail.pl",
      "10x9.com",
      "11163.com",
      "123-m.com",
      "12hosting.net",
      "12houremail.com",
      "12minutemail.com",
      "12minutemail.net",
      "12storage.com",
      "140unichars.com",
      "147.cl",
      "14n.co.uk",
      "15qm.com",
      "1blackmoon.com",
      "1ce.us",
      "1chuan.com",
      "1clck2.com",
      "1fsdfdsfsdf.tk",
      "1mail.ml",
      "1pad.de",
      "1s.fr",
      "1secmail.com",
      "1secmail.net",
      "1secmail.org",
      "1st-forms.com",
      "1to1mail.org",
      "1usemail.com",
      "1webmail.info",
      "1zhuan.com",
      "2012-2016.ru",
      "20email.eu",
      "20email.it",
      "20mail.eu",
      "20mail.in",
      "20mail.it",
      "20minutemail.com",
      "20minutemail.it",
      "20mm.eu",
      "2120001.net",
      "21cn.com",
      "247web.net",
      "24hourmail.com",
      "24hourmail.net",
      "2anom.com",
      "2chmail.net",
      "2ether.net",
      "2odem.com",
      "2prong.com",
      "2wc.info",
      "300book.info",
      "30mail.ir",
      "30minutemail.com",
      "30wave.com",
      "3202.com",
      "36ru.com",
      "3d-painting.com",
      "3l6.com",
      "3mail.ga",
      "4-n.us",
      "4057.com",
      "418.dk",
      "42o.org",
      "4gfdsgfdgfd.tk",
      "4mail.cf",
      "4mail.ga",
      "4nextmail.com",
      "4nmv.ru",
      "4tb.host",
      "4warding.com",
      "4warding.net",
      "4warding.org",
      "50set.ru",
      "55hosting.net",
      "5ghgfhfghfgh.tk",
      "5gramos.com",
      "5july.org",
      "5mail.cf",
      "5mail.ga",
      "5oz.ru",
      "5x25.com",
      "5ymail.com",
      "60minutemail.com",
      "672643.net",
      "675hosting.com",
      "675hosting.net",
      "675hosting.org",
      "6hjgjhgkilkj.tk",
      "6ip.us",
      "6mail.cf",
      "6mail.ga",
      "6mail.ml",
      "6paq.com",
      "6somok.ru",
      "6url.com",
      "75hosting.com",
      "75hosting.net",
      "75hosting.org",
      "7days-printing.com",
      "7mail.ga",
      "7mail.ml",
      "7tags.com",
      "80665.com",
      "8127ep.com",
      "8mail.cf",
      "8mail.ga",
      "8mail.ml",
      "99.com",
      "99cows.com",
      "99experts.com",
      "9mail.cf",
      "9me.site",
      "9mot.ru",
      "9ox.net",
      "9q.ro",
      "a-bc.net",
      "a45.in",
      "a7996.com",
      "aa5zy64.com",
      "abacuswe.us",
      "abakiss.com",
      "abcmail.email",
      "abilitywe.us",
      "abovewe.us",
      "absolutewe.us",
      "abundantwe.us",
      "abusemail.de",
      "abuser.eu",
      "abyssmail.com",
      "ac20mail.in",
      "academiccommunity.com",
      "academywe.us",
      "acceleratewe.us",
      "accentwe.us",
      "acceptwe.us",
      "acclaimwe.us",
      "accordwe.us",
      "accreditedwe.us",
      "acentri.com",
      "achievementwe.us",
      "achievewe.us",
      "acornwe.us",
      "acrylicwe.us",
      "activatewe.us",
      "activitywe.us",
      "acucre.com",
      "acuitywe.us",
      "acumenwe.us",
      "adaptivewe.us",
      "adaptwe.us",
      "add3000.pp.ua",
      "addictingtrailers.com",
      "adeptwe.us",
      "adiq.eu",
      "aditus.info",
      "admiralwe.us",
      "ado888.biz",
      "adobeccepdm.com",
      "adoniswe.us",
      "adpugh.org",
      "adsd.org",
      "adubiz.info",
      "advantagewe.us",
      "advantimo.com",
      "adventurewe.us",
      "adventwe.us",
      "advisorwe.us",
      "advocatewe.us",
      "adwaterandstir.com",
      "aegde.com",
      "aegia.net",
      "aegiscorp.net",
      "aegiswe.us",
      "aelo.es",
      "aeonpsi.com",
      "affiliate-nebenjob.info",
      "affiliatedwe.us",
      "affilikingz.de",
      "affinitywe.us",
      "affluentwe.us",
      "affordablewe.us",
      "afrobacon.com",
      "afterhourswe.us",
      "agedmail.com",
      "agendawe.us",
      "agger.ro",
      "agilewe.us",
      "agorawe.us",
      "agtx.net",
      "aheadwe.us",
      "ahem.email",
      "ahk.jp",
      "air2token.com",
      "airsi.de",
      "ajaxapp.net",
      "akapost.com",
      "akerd.com",
      "akgq701.com",
      "al-qaeda.us",
      "albionwe.us",
      "alchemywe.us",
      "aleeas.com",
      "aliaswe.us",
      "alienware13.com",
      "aligamel.com",
      "alisongamel.com",
      "alivance.com",
      "alivewe.us",
      "all-cats.ru",
      "allaccesswe.us",
      "allamericanwe.us",
      "allaroundwe.us",
      "alldirectbuy.com",
      "allegiancewe.us",
      "allegrowe.us",
      "allemojikeyboard.com",
      "allgoodwe.us",
      "alliancewe.us",
      "allinonewe.us",
      "allofthem.net",
      "alloutwe.us",
      "allowed.org",
      "alloywe.us",
    ];

    const domain = email.split("@")[1];
    if (disposableDomains.includes(domain)) {
      emailFeedback.textContent = "Please use a non-disposable email address.";
      return false;
    }

    const validDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "icloud.com",
      "aol.com",
      "	hotmail.co.uk",
      "hotmail.fr",
      "msn.com",
      "mail.com",
      "msn.com",
      "live.com",
      "yandex.com",
      "zoho.com",
      "protonmail.com",
      "gmx.com",
      "fastmail.com",
      "me.com",
      "mac.com",
      "comcast.net",
      "verizon.net",
      "att.net",
      "sbcglobal.net",
      "cox.net",
      "xfinity.com",
      "charter.net",
      "bellsouth.net",
      "earthlink.net",
      "optonline.net",
      "frontier.com",
      "windstream.net",
      "shaw.ca",
      "rogers.com",
      "sympatico.ca",
      "telus.com",
      "t-online.de",
      "web.de",
      "mail.ru",
      "rambler.ru",
      "bk.ru",
      "inbox.ru",
      "list.ru",
      "qq.com",
      "163.com",
      "126.com",
      "sina.com",
      "sohu.com",
      "yeah.net",
      "foxmail.com",
      "zoho.in",
      "rediffmail.com",
      "indiatimes.com",
      "bigpond.com",
      "optusnet.com.au",
      "ozemail.com.au",
      "freemail.hu",
      "centrum.cz",
      "seznam.cz",
      "volny.cz",
      "libero.it",
      "alice.it",
      "virgilio.it",
      "tiscali.it",
      "wanadoo.fr",
      "orange.fr",
      "laposte.net",
      "free.fr",
      "sfr.fr",
      "neuf.fr",
      "btinternet.com",
      "sky.com",
      "talktalk.net",
      "virginmedia.com",
      "ntlworld.com",
      "blueyonder.co.uk",
      "btopenworld.com",
      "o2.co.uk",
      "live.co.uk",
      "msn.co.uk",
      "hotmail.co.uk",
      "webmail.co.za",
      "mweb.co.za",
      "telkomsa.net",
      "vox.co.za",
      "1und1.de",
      "arcor.de",
      "online.de",
      "freenet.de",
      "posteo.de",
      "proximus.be",
      "skynet.be",
      "tele2.nl",
      "kpnmail.nl",
      "ziggo.nl",
      "planet.nl",
      "home.nl",
      "xs4all.nl",
      "hetnet.nl",
      "upcmail.nl",
      "outlook.es",
      "hotmail.es",
      "wanadoo.es",
      "terra.es",
      "telefonica.net",
      "uol.com.br",
      "bol.com.br",
      "ig.com.br",
      "r7.com",
      "terra.com.br",
    ];

    if (!validDomains.includes(domain)) {
      emailFeedback.textContent = "";
      return false;
    }

    return true;
  }

  emailInput.addEventListener("input", function () {
    const email = this.value;
    if (!isValidEmail(email)) {
      this.classList.add("is-invalid");
      this.setCustomValidity("Invalid email");
    } else {
      this.classList.remove("is-invalid");
      this.setCustomValidity("");
    }
  });
function showStep(stepNumber) {
    steps.forEach((step, index) => {
        if (index + 1 === stepNumber) {
            step.classList.add("active");
            step.style.display = "block";
        } else {
            step.classList.remove("active");
            step.style.display = "none";
        }
    });

    const progress = stepNumber * 25; 
    progressBar.style.width = `${progress}%`;
    stepIndicator.textContent = `Step ${stepNumber} of ${steps.length}`;
}

  form.addEventListener("click", function (e) {
    if (e.target.classList.contains("next-step")) {
      e.preventDefault();
      const currentStep = form.querySelector(".form-step.active");
      const currentStepNum = parseInt(currentStep.dataset.step);

      const inputs = currentStep.querySelectorAll(
        "input[required], select[required], textarea[required]"
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value) {
          isValid = false;
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
        }
      });

      if (isValid) {
        showStep(currentStepNum + 1);
      }
    }

    if (e.target.classList.contains("prev-step")) {
      e.preventDefault();
      const currentStep = form.querySelector(".form-step.active");
      const currentStepNum = parseInt(currentStep.dataset.step);
      showStep(currentStepNum - 1);
    }
  });

  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let x = e.target.value
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const currentStep = form.querySelector(".form-step.active");
    const inputs = currentStep.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value) {
        isValid = false;
        input.classList.add("is-invalid");
      } else {
        input.classList.remove("is-invalid");
      }
    });

    if (isValid) {
      console.log("Form submitted successfully");
    }
  });
});
