// BSOD (Blue Screen of Death) implementation

export function initBSOD(win, showNotification) {
  // Remove window controls (close, minimize, maximize)
  const controls = win.querySelector('.title-bar-controls');
  if (controls) controls.remove();

  // Make window non-draggable
  const titleBar = win.querySelector('.title-bar');
  if (titleBar) titleBar.style.cursor = 'default';
  win.style.cursor = 'none'; // Hide cursor over the BSOD

  // Force fullscreen (or as close as possible)
  win.style.left = '0px';
  win.style.top = '0px';
  win.style.width = '100vw';
  win.style.height = '100vh';
  win.style.zIndex = '99999'; // Highest z-index

  const contentArea = win.querySelector('.window-content') || win.querySelector('.window-body');
  contentArea.innerHTML = ''; // Clear existing content
  contentArea.style.padding = '40px'; // BSOD padding
  contentArea.style.backgroundColor = '#0000AA'; // Classic BSOD blue
  contentArea.style.color = '#FFFFFF'; // White text
  contentArea.style.fontFamily = '"Lucida Console", Monaco, monospace'; // Fixed-width font
  contentArea.style.fontSize = '16px';
  contentArea.style.whiteSpace = 'pre-wrap'; // Preserve whitespace and newlines
  contentArea.style.overflow = 'hidden'; // No scrollbars

  // Classic BSOD text
  contentArea.innerHTML = `
A problem has been detected and Windows has been shut down to prevent damage
to your computer.

SYSTEM_SERVICE_EXCEPTION

If this is the first time you've seen this Stop error screen,
restart your computer. If this screen appears again, follow
these steps:

Check to make sure any new hardware or software is properly installed.
If this is a new installation, ask your hardware or software manufacturer
for any Windows updates you might need.

If problems continue, disable or remove any newly installed hardware
or software. Disable BIOS memory options such as caching or shadowing.
If you need to use Safe Mode to remove or disable components, restart
your computer, press F8 to select Advanced Startup Options, and then
select Safe Mode.

Technical information:

*** STOP: 0x0000003B (0x00000000C0000005, 0xFFFFF80003074E8C, 0xFFFFF880048A74E0, 0x0000000000000000)

Beginning dump of physical memory
Physical memory dump complete.
Contact your system administrator or technical support group for further
assistance.


  `;

  // Play error sound once
  const errorSound = new Audio("Windows XP Error Sound.mp3");
  errorSound.play().catch(e => console.warn("Could not play BSOD sound:", e));

  // Disable keyboard interactions within the window (optional)
  win.addEventListener('keydown', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });

  // Show notification
  showNotification("FATAL SYSTEM ERROR DETECTED!");
}