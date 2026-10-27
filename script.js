/**
 * AVENGERS CLUB // RECRUITMENT INITIATIVE
 * Pure Vanilla JavaScript Client Application Logic
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Synthesized Web Audio API Sound Effects
  // --------------------------------------------------------------------------
  let audioCtx = null;
  let soundEnabled = false;

  const initAudio = () => {
    if (!audioCtx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  };

  const playTacticalBeep = (freq = 600, duration = 0.06, type = 'sine') => {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.4, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  };

  const playHoverSound = () => {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {}
  };

  const playSuccessChime = () => {
    if (!soundEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        setTimeout(() => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.35);
        }, i * 75);
      });
    } catch (e) {}
  };

  // Sound Toggle Control
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundStatusText = document.getElementById('sound-status-text');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        initAudio();
        soundToggleBtn.classList.add('active');
        if (soundStatusText) soundStatusText.textContent = 'AUDIO ON';
        playTacticalBeep(880, 0.05);
      } else {
        soundToggleBtn.classList.remove('active');
        if (soundStatusText) soundStatusText.textContent = 'AUDIO OFF';
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. Ambient Tactical Cursor Spotlight
  // --------------------------------------------------------------------------
  const cursorGlow = document.getElementById('tactical-cursor-glow');
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (cursorGlow && !isTouchDevice && !prefersReducedMotion) {
    let rafId;
    window.addEventListener('mousemove', (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
        cursorGlow.classList.add('active');
      });
    });

    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
    });
    document.addEventListener('mouseenter', () => {
      cursorGlow.classList.add('active');
    });
  }

  // Add hover sound to all interactive elements
  document.querySelectorAll('a, button, input, select, textarea, .activity-card, .team-card').forEach((el) => {
    el.addEventListener('mouseenter', playHoverSound);
  });

  // --------------------------------------------------------------------------
  // 3. Sticky Navbar & Active Section Tracking (Scrollspy)
  // --------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    const scrollY = window.pageYOffset + 240;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --------------------------------------------------------------------------
  // 4. Mobile Menu Drawer
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      playTacticalBeep(650, 0.04);
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. Activities Sector Filter Tabs & Enlist Shortcuts
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const activityCards = document.querySelectorAll('.activity-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      playTacticalBeep(600, 0.03);
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      activityCards.forEach((card) => {
        const sector = card.getAttribute('data-sector');
        if (filter === 'ALL' || sector === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Enlist Buttons inside Activity Cards
  document.querySelectorAll('.activity-action-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      playTacticalBeep(800, 0.05);
      const targetDiv = btn.getAttribute('data-division');

      // Pre-select chip in recruitment form
      const chips = document.querySelectorAll('.division-chip');
      chips.forEach((chip) => {
        if (chip.getAttribute('data-division') === targetDiv) {
          chip.click();
        }
      });

      const recSection = document.getElementById('recruitment');
      if (recSection) {
        recSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 6. Team Classified Dossier Modal
  // --------------------------------------------------------------------------
  const modalOverlay = document.getElementById('cadet-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDismissBtn = document.getElementById('modal-dismiss-btn');
  const modalApplyBtn = document.getElementById('modal-apply-btn');

  const modalImg = document.getElementById('modal-img');
  const modalName = document.getElementById('modal-name');
  const modalRole = document.getElementById('modal-role');
  const modalDept = document.getElementById('modal-dept');
  const modalBio = document.getElementById('modal-bio');
  const modalSpecialty = document.getElementById('modal-specialty');

  const teamData = {
    'tony-stark': {
      name: 'Tony Stark',
      callsign: 'ARCHITECT',
      role: 'President',
      dept: 'Robotics & Systems Engineering • Senior',
      bio: 'Hardware tinkerer, collegiate hackathon veteran, and serial builder dedicated to scalable student innovation and autonomous systems prototyping.',
      specialty: 'Mechatronic Prototyping & Strategy',
      img: 'assets/team-tony-stark.jpg',
      division: 'Tech Lab'
    },
    'steve-rogers': {
      name: 'Steve Rogers',
      callsign: 'VANGUARD',
      role: 'Vice President',
      dept: 'Strategic Governance & Law • Senior',
      bio: 'Dedicated to campus leadership ethics, multi-squad operations, student welfare, and unifying interdisciplinary project squads under a single mission.',
      specialty: 'Leadership Development & Operations',
      img: 'assets/team-steve-rogers.jpg',
      division: 'Strategy Room'
    },
    'natasha-romanoff': {
      name: 'Natasha Romanoff',
      callsign: 'SHADOW-1',
      role: 'Operations Lead',
      dept: 'Information Systems & Analytics • Junior',
      bio: 'Master coordinator handling rapid campus logistics, event safety protocols, inter-club sponsorships, and strategic operations deployment.',
      specialty: 'Data Analytics & Strategic Logistics',
      img: 'assets/team-natasha-ops.jpg',
      division: 'Event Operations'
    },
    'bruce-banner': {
      name: 'Bruce Banner',
      callsign: 'SYNAPSE',
      role: 'Technical Lead',
      dept: 'Computer Science & Neural AI • Graduate Fellow',
      bio: 'Architecting supercomputing clusters, competitive coding drills, machine learning pipelines, and open-source college cloud platforms.',
      specialty: 'Distributed Systems & Machine Learning',
      img: 'assets/team-bruce-tech.jpg',
      division: 'Tech Lab'
    },
    'peter-parker': {
      name: 'Peter Parker',
      callsign: 'SPECTER',
      role: 'Media & Design Lead',
      dept: 'Visual Communications & Interaction • Sophomore',
      bio: 'Passionate digital storyteller crafting futuristic brand identities, high-voltage cinematography, AR web experiences, and visual campaign teasers.',
      specialty: 'UI/UX & Interactive Media Design',
      img: 'assets/team-peter-design.svg',
      division: 'Creative Studio'
    }
  };

  const openDossier = (cadetKey) => {
    playTacticalBeep(750, 0.05);
    const cadet = teamData[cadetKey];
    if (!cadet || !modalOverlay) return;

    if (modalImg) modalImg.src = cadet.img;
    if (modalName) modalName.textContent = cadet.name;
    if (modalRole) modalRole.textContent = `${cadet.role} // CALLSIGN: ${cadet.callsign}`;
    if (modalDept) modalDept.textContent = cadet.dept;
    if (modalBio) modalBio.textContent = cadet.bio;
    if (modalSpecialty) modalSpecialty.textContent = cadet.specialty;

    if (modalApplyBtn) {
      modalApplyBtn.setAttribute('data-division', cadet.division);
    }

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDossier = () => {
    playTacticalBeep(500, 0.04);
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.team-card').forEach((card) => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-cadet');
      openDossier(key);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const key = card.getAttribute('data-cadet');
        openDossier(key);
      }
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeDossier);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeDossier);

  if (modalApplyBtn) {
    modalApplyBtn.addEventListener('click', () => {
      const div = modalApplyBtn.getAttribute('data-division');
      closeDossier();
      const chips = document.querySelectorAll('.division-chip');
      chips.forEach((c) => {
        if (c.getAttribute('data-division') === div) c.click();
      });
      const rec = document.getElementById('recruitment');
      if (rec) rec.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeDossier();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeDossier();
    }
  });

  // --------------------------------------------------------------------------
  // 7. Recruitment Form Validation & Simulated Transmission
  // --------------------------------------------------------------------------
  const recruitmentForm = document.getElementById('recruitment-form');
  const confirmationCard = document.getElementById('confirmation-card');
  const progressBox = document.getElementById('transmission-progress-box');
  const progressBar = document.getElementById('transmission-progress-bar');
  const progressLabel = document.getElementById('transmission-status-label');
  const progressPct = document.getElementById('transmission-pct');

  let selectedDivision = '';

  // Division selector chips
  const divisionChips = document.querySelectorAll('.division-chip');
  divisionChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      playTacticalBeep(650, 0.03);
      divisionChips.forEach((c) => c.classList.remove('selected'));
      chip.classList.add('selected');
      selectedDivision = chip.getAttribute('data-division');

      const errEl = document.getElementById('err-division');
      if (errEl) errEl.textContent = '';
    });
  });

  // Form Submission
  if (recruitmentForm) {
    recruitmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      playTacticalBeep(700, 0.05);

      let hasError = false;

      // Reset errors
      document.querySelectorAll('.error-text').forEach((el) => (el.textContent = ''));
      document.querySelectorAll('.form-control').forEach((el) => el.classList.remove('error'));

      const fullName = document.getElementById('fullName');
      const email = document.getElementById('email');
      const department = document.getElementById('department');
      const yearOfStudy = document.getElementById('yearOfStudy');
      const skills = document.getElementById('skills');
      const whyJoin = document.getElementById('whyJoin');
      const agreePrivacy = document.getElementById('agreePrivacy');

      // Full Name
      if (!fullName.value.trim() || fullName.value.trim().length < 2) {
        document.getElementById('err-fullName').textContent = 'Please enter your full name (at least 2 characters).';
        fullName.classList.add('error');
        hasError = true;
      }

      // College Email Regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        document.getElementById('err-email').textContent = 'Please enter a valid college email address (e.g. name@campus.edu).';
        email.classList.add('error');
        hasError = true;
      }

      // Department
      if (!department.value) {
        document.getElementById('err-department').textContent = 'Please select your academic department.';
        department.classList.add('error');
        hasError = true;
      }

      // Year of Study
      if (!yearOfStudy.value) {
        document.getElementById('err-yearOfStudy').textContent = 'Please select your current year of study.';
        yearOfStudy.classList.add('error');
        hasError = true;
      }

      // Division
      if (!selectedDivision) {
        document.getElementById('err-division').textContent = 'Please select your primary operational division.';
        hasError = true;
      }

      // Statement of purpose
      if (!whyJoin.value.trim() || whyJoin.value.trim().length < 25) {
        document.getElementById('err-whyJoin').textContent = 'Please provide at least 25 characters explaining your motivation.';
        whyJoin.classList.add('error');
        hasError = true;
      }

      // Privacy Checkbox
      if (!agreePrivacy.checked) {
        document.getElementById('err-agreePrivacy').textContent = 'You must acknowledge the recruitment notice and code of conduct.';
        hasError = true;
      }

      if (hasError) {
        playTacticalBeep(350, 0.1, 'sawtooth');
        const firstErr = document.querySelector('.form-control.error');
        if (firstErr) firstErr.focus();
        return;
      }

      // Start simulated transmission sequence
      if (progressBox) progressBox.style.display = 'block';
      const submitBtn = document.getElementById('btn-submit-form');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'TRANSMITTING...';
      }

      let pct = 15;
      if (progressBar) progressBar.style.width = '15%';
      if (progressPct) progressPct.textContent = '15%';
      if (progressLabel) progressLabel.textContent = 'ENCRYPTING CADET DOSSIER (AES-256)...';

      setTimeout(() => {
        pct = 50;
        if (progressBar) progressBar.style.width = '50%';
        if (progressPct) progressPct.textContent = '50%';
        if (progressLabel) progressLabel.textContent = 'SYNCHRONIZING WITH CAMPUS GATEWAY...';
      }, 400);

      setTimeout(() => {
        pct = 85;
        if (progressBar) progressBar.style.width = '85%';
        if (progressPct) progressPct.textContent = '85%';
        if (progressLabel) progressLabel.textContent = 'VERIFYING SQUAD QUOTA & CREDENTIALS...';
      }, 850);

      setTimeout(() => {
        if (progressBar) progressBar.style.width = '100%';
        if (progressPct) progressPct.textContent = '100%';
        if (progressLabel) progressLabel.textContent = 'TRANSMISSION CONFIRMED // DOSSIER CATALOGED';

        const refId = `AVG-2026-${Math.floor(1000 + Math.random() * 9000)}-${selectedDivision.slice(0, 3).toUpperCase()}`;
        const submittedTime = new Date().toLocaleString();

        const dossierData = {
          fullName: fullName.value.trim(),
          email: email.value.trim(),
          department: department.value,
          yearOfStudy: yearOfStudy.value,
          division: selectedDivision,
          skills: skills ? skills.value.trim() : '',
          whyJoin: whyJoin.value.trim(),
          refId: refId,
          submittedAt: submittedTime
        };

        // Persist to local storage demo registry
        try {
          const list = JSON.parse(localStorage.getItem('avengers_demo_apps') || '[]');
          list.push(dossierData);
          localStorage.setItem('avengers_demo_apps', JSON.stringify(list));
        } catch (e) {}

        // Populate Confirmation Card
        document.getElementById('conf-ref-id').textContent = refId;
        document.getElementById('conf-name').textContent = dossierData.fullName;
        document.getElementById('conf-div').textContent = dossierData.division;
        document.getElementById('conf-dept').textContent = dossierData.department;
        document.getElementById('conf-time').textContent = submittedTime;

        // Switch to Confirmation Card
        recruitmentForm.style.display = 'none';
        if (progressBox) progressBox.style.display = 'none';
        if (confirmationCard) confirmationCard.style.display = 'block';

        playSuccessChime();

        // Download dossier pass handler
        const downloadBtn = document.getElementById('btn-download-pass');
        if (downloadBtn) {
          downloadBtn.onclick = () => {
            playTacticalBeep(800, 0.04);
            const passText = `================================================
AVENGERS CLUB // CADET RECRUITMENT DOSSIER
CONFIDENTIAL - CAMPUS INITIATIVE 2026
================================================
REFERENCE ID: ${refId}
SUBMISSION TIME: ${submittedTime}
CANDIDATE: ${dossierData.fullName}
EMAIL: ${dossierData.email}
DEPARTMENT: ${dossierData.department}
YEAR OF STUDY: ${dossierData.yearOfStudy}
PRIMARY DIVISION: ${dossierData.division}
SKILLS / EXP: ${dossierData.skills || 'None provided'}
STATEMENT OF PURPOSE:
${dossierData.whyJoin}

STATUS: APPLICATION LOGGED (SIMULATION MODE)
NEXT STEP: TACTICAL COFFEE CHAT & RECEPTION
DISPATCH HQ: recruitment@avengers-initiative.campus.edu
================================================`;

            const blob = new Blob([passText], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${refId}-Dossier.txt`;
            a.click();
            URL.revokeObjectURL(url);
          };
        }
      }, 1300);
    });
  }

  // Reset Button
  const resetBtn = document.getElementById('btn-reset-form');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      playTacticalBeep(600, 0.04);
      if (recruitmentForm) {
        recruitmentForm.reset();
        recruitmentForm.style.display = 'block';
      }
      if (confirmationCard) confirmationCard.style.display = 'none';
      if (progressBar) progressBar.style.width = '0%';
      const submitBtn = document.getElementById('btn-submit-form');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'TRANSMIT APPLICATION // ENLIST';
      }
      selectedDivision = '';
      divisionChips.forEach((c) => c.classList.remove('selected'));
    });
  }

  // --------------------------------------------------------------------------
  // 8. FAQ Accordion Toggle
  // --------------------------------------------------------------------------
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  accordionHeaders.forEach((header) => {
    header.addEventListener('click', () => {
      playTacticalBeep(600, 0.03);
      const item = header.parentElement;
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.accordion-item').forEach((i) => {
        i.classList.remove('open');
        const h = i.querySelector('.accordion-header');
        if (h) h.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --------------------------------------------------------------------------
  // 9. Copy Dispatch Email
  // --------------------------------------------------------------------------
  const copyBtn = document.getElementById('btn-copy-email');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      playTacticalBeep(800, 0.04);
      const email = 'recruitment@avengers-initiative.campus.edu';
      navigator.clipboard.writeText(email).then(() => {
        const origText = copyBtn.innerHTML;
        copyBtn.innerHTML = '✓ COPIED';
        setTimeout(() => {
          copyBtn.innerHTML = origText;
        }, 2000);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 10. Scroll to Top
  // --------------------------------------------------------------------------
  const topBtn = document.getElementById('btn-scroll-top');
  if (topBtn) {
    topBtn.addEventListener('click', () => {
      playTacticalBeep(700, 0.05);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
