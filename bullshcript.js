/* YouTube Playlists
3D Videos PL24rMr-iJJ1LwIG3SPYtnJa3qd3O4F-oQ
*/

/* Screencast - https://screen.sdq.st:8443/?room=3dcinema */
/* Old Screencast - https://sidequestvr.github.io/SideQuest.Banter.Spaces/screen-cast/?sid=42424242 */
/* YouTube Live - https://www.youtube.com/embed/EF0-j9ORe2Y?autoplay=1&controls=0 */
let youtubePlaylist = `PL24rMr-iJJ1LwIG3SPYtnJa3qd3O4F-oQ`;
// let websiteurl = "https://sidequestvr.github.io/SideQuest.Banter.Spaces/screen-cast/?sid=42424242"; /* ?autoplay=1&controls=0 For YouTube Live */ 
let otherwebsiteurl = "https://firer.at/pages/games.html";

BS.BanterScene.GetInstance().On("loaded", () => {
 	console.log("Scene loaded");
	/* UNCOMMENTED THIS TO ENABLE THE YOUTUBE PLAYER */
		// enableYouTube();
	/* UNCOMMENTED THIS TO ENABLE SCREEN CAST / YOUTUBE LIVE */
		// enableTheFireScreen();
	/* UNCOMMENTED THIS TO ENABLE FIRE TABLET */
		// enableThePortableFireScreen();
});

// Player Toggle's by FireRat
let ytplayerdisabled = true;
let karaokeplayerdisabled = true;
let screenstuffDisabled = true;

/////////////// RENDER SCRIPT LOADER STUFF ///////////////
async function injectRenderScript(theScriptsURL, TheScriptsName = "UnNamed", attributes = {}, appendTo = document.body) {
  const scriptUrl = theScriptsURL;
  try { // 1. "Warm-up" request: Ping the server to wake it up.
    console.log("Waking up the server...");
    await fetch(scriptUrl, { method: 'HEAD', mode: 'no-cors' }); // We use { method: 'HEAD' } to be more efficient.
    console.log("Server is awake! Injecting script..."); // We only need to know the server is awake, not download the whole script yet.
    const script = document.createElement("script"); // 2. Inject the script now that the server is ready.
    script.id = `${TheScriptsName}`;
    script.setAttribute("src", scriptUrl); // Set the src attribute
    Object.entries(attributes).forEach(([key, value]) => { script.setAttribute(key, value); }); // Set all custom attributes
    appendTo.appendChild(script);
    script.onload = () => { console.log(`${TheScriptsName} script loaded successfully!`); }; // Set up event handlers
    script.onerror = () => { console.error(`Failed to load the ${TheScriptsName} script.`); };
  } catch (error) { // The fetch itself might fail, though 'no-cors' mode often prevents this.
    console.error("The warm-up request failed. The script might not load.", error); // The real check is the script's onerror handler.
  }
}

// YouTube player toggle
async function enableYouTube() {
	// If Browser already exists, DESTROY IT!
	var browser = await BS.BanterScene.GetInstance().Find('MainParentObject2');
	if (browser) { console.log("Browser2 Found, Removing it!"); cleanupFireScreenV2(2); screenstuffDisabled = true; }
	// If Karaoke Player exists, Destroy it!
	let delayYT = false;
	if (window.karaokePlayerInstance) { delayYT = true; karaokeplayerdisabled = true; console.log("Karaoke Player exists, Destroying it!"); window.cleanupVideoPlayer(); }
	if (ytplayerdisabled){ ytplayerdisabled = false;
		setTimeout(() => {  
			console.log("YouTube Player Loading");

			const youtubeAttributes = {
				"scale": "1 1 1",
				"mip-maps": "0",
				"rotation": "0 0 0",
				"position": "0.002 -5 0",
				"hand-controls": "true",
				"button-position": "-18.4 0.9 -1.45",
				"volume": "5",
				"button-rotation": "0 0 0",
				"button-scale": "1 1 1",
				"spatial": "false",
				// "spatial-min-distance": "1",
				// "spatial-max-distance": "1000",
				"playlist": youtubePlaylist,
				"announce": "false",
				// "instance": "3dcinema-vidyainstance",
				"announce-events": "false",
				"announce-four-twenty": "false"
			};

			injectRenderScript(
				"https://vidya.firer.at/playlist.js", // firer.at / sdq.st
				"3dcinema-videoplayer", youtubeAttributes, document.querySelector("a-scene")
			);

		}, delayYT ? 2000 : 0);
  } else {console.log("YouTube Player Loading...");}
};

// Fire Screen Toggle
function enableTheFireScreen() {
	// If Karaoke Player exists, Destroy it!
	if (window.karaokePlayerInstance) { karaokeplayerdisabled = true; console.log("Karaoke Player exists, Destroying it!"); window.cleanupVideoPlayer(); }
	// If YouTube Player exists, Destroy it!
	if (window.playlistPlayerInstance) { ytplayerdisabled = true; console.log("YouTube Player exists, Destroying it!"); window.cleanupVideoPlayer(); }
	setTimeout(() => { 
		if (screenstuffDisabled){
			screenstuffDisabled = false;
			console.log("Adding Screen Cast");
			const firescreenAttributes = {
				"scale": "1 1 1",
				"mipmaps": "0",
				"rotation": "0 0 0",
				"screen-rotation": "0 0 0",
				"screen-scale": "0.515 0.515 1",
				"position": "-18.2 0.6 1.451",
				"lock-position": "true",
				"hand-controls": "true",
				"pixelsperunit": "1600",
				"castmode": "true",
				"backdrop": "false",
				"disable-rotation": "true",
				"announce": "false",
				"announce-events": "false",
				"announce-420": "false",
				"volume": "0.2",
				"width": "1920",
				"height": "1080",
				"screen-position": "18.2028 -5.6 -1.451",
				"website": websiteurl
			};
			const firescreen = document.createElement("script");
			firescreen.id = "3dcinema-firescreen";
			firescreen.setAttribute("src", "https://firer.at/scripts/firescreenv2.js");
			Object.entries(firescreenAttributes).forEach(([key, value]) => { firescreen.setAttribute(key, value); });
			document.querySelector("a-scene").appendChild(firescreen);
			if (websiteurl.includes("hyperbeam.com/i/")) {
				setTimeout(async () => { 
					let theBrowserthingy = await BS.BanterScene.GetInstance().Find(`MyBrowser2`);
					let thebrowserpart = theBrowserthingy.GetComponent(BS.ComponentType.BanterBrowser);
					thebrowserpart.RunActions(JSON.stringify({"actions": [{ "actionType": "runscript","strparam1": "const checkbox = document.querySelector(`.p-checkbox-box[role='checkbox']`); const joinButton = document.querySelector('.footer_3Yiou .joinBtn_1TAU6'); if (checkbox) checkbox.click(); if (joinButton) { const observer = new MutationObserver(() => { if (!joinButton.classList.contains('p-disabled')) { joinButton.click(); observer.disconnect(); setTimeout(() => { const skipButton = document.querySelector('.dialog-secondary-btn'); if (skipButton) skipButton.click(); }, 3000); } }); observer.observe(joinButton, { attributes: true, attributeFilter: ['class'] }); }" }]}));
					setTimeout(async () => {
						thebrowserpart.RunActions(JSON.stringify({"actions": [{ "actionType": "runscript","strparam1": "var fullscreenButton = document.querySelector(`.p-button.p-component.tu-button.btn-tertiary.btn_2YRyp svg path[d^='M3 3h6.429']`); if (fullscreenButton) { fullscreenButton.closest('button').click(); } setTimeout(async () => { var chatButton = document.querySelector(`.p-button.p-component.tu-button.btn-tertiary.fsChatBtn_2cCyy svg path[d^='M22 22h-2V2h2v20zM2 11h12.17']`); if (chatButton) { chatButton.closest('button').click(); } }, 3500);" }]}));
					}, 5000);
				}, 500);
			}
		}
	}, 3000); 
	console.log("Screen Stuff enabled: " + screenstuffDisabled);
};

// Fire Tablet
let screenPortableDisabled = true;
function enableThePortableFireScreen(announce = false) {
  if (screenPortableDisabled){ screenPortableDisabled = false;
		console.log("Adding Fire Tablet");
		const firescreenAttributes = {
			"scale": "0.7 0.7 1",
			"mipmaps": "0",
			"rotation": "0 0 0",
			"position": "-16.45 1.269 0.75",
			"pixelsperunit": "1200",
			"width": "1280",
			"height": "720",
			"announce": announce,
			"announce-events": announce,
			"announce-420": announce,
			"volume": "0.25",
			"backdrop": "true",
			"hand-controls": "true",
			"custom-button01-url": "https://jackbox.tv",
			"custom-button01-text": "Jackbox.tv",
			"custom-button02-url": "https://papas.tv",
			"custom-button02-text": "Papas.tv",
			"custom-button03-url": "https://songpop-party.com/join",
			"custom-button03-text": "SongPop Party",
			"custom-button04-url": "https://paperpirat.es/",
			"custom-button04-text": "PaperPirat.es",
			"custom-button05-url": "https://firer.at/pages/scuffeduno.html",
			"custom-button05-text": "ScuffedUNO",
			"website": otherwebsiteurl
		};
		const firescreen = document.createElement("script");
		firescreen.id = "cannabanter-firetablet";
		firescreen.setAttribute("src", "https://firer.at/scripts/firescreenv2.js");
		Object.entries(firescreenAttributes).forEach(([key, value]) => { firescreen.setAttribute(key, value); });
		document.querySelector("a-scene").appendChild(firescreen);
  }; console.log("Fire Tablet enabled");
};

// BobCast Home Button Auto Play, SideQuest Stream Home Button Fullscreen and Unmute
document.addEventListener('CustomButtonClick', async function(event) {
    // console.log('--- Detected a Button Click event! ---', event.detail.buttonName);

    switch (event.detail.buttonName) {
        case 'Home':
            const message = String(event.detail.message);

            // --- Existing Logic: Owncast ---
            if (message.includes("embed/video")) {
                setTimeout(async () => {
                    (await BS.BanterScene.GetInstance().Find(`MyBrowser2`)).GetComponent(BS.ComponentType.BanterBrowser).RunActions(JSON.stringify({
                        actions: [
                            { actionType: "runscript", strparam1: `document.querySelector('[title="Play Video"]').click();` },
                            { actionType: "keypress", strparam1: "f" }
                        ]
                    }));
                }, 2000);

            // --- New Logic: SideQuest VR Stream (With Timeout) ---
            } else if (message.includes("sidequestvr.com/stream/view")) {
                
                setTimeout(async () => {
                    // Define the script to inject
                    const fullscreenAndUnmute = `
                        var wrapper = document.querySelector('.stream-video__wrapper');
                        if (wrapper) {
                            document.body.appendChild(wrapper);
                            wrapper.style.cssText = 'position:fixed !important; top:0 !important; left:0 !important; width:100vw !important; height:100vh !important; z-index:2147483647 !important; background:black !important; display:flex !important; align-items:center !important; justify-content:center !important;';
                            
                            var vid = wrapper.querySelector('video');
                            if(vid) { 
                                vid.style.width = '100%'; 
                                vid.style.height = '100%'; 
                                vid.style.objectFit = 'contain'; 
                                
                                vid.muted = false;
                                vid.volume = 1.0;
                            }
                        }
                    `;

                    // Execute the action on MyBrowser2
                    const browser = await BS.BanterScene.GetInstance().Find(`MyBrowser2`);
                    browser.GetComponent(BS.ComponentType.BanterBrowser).RunActions(JSON.stringify({
                        actions: [
                            {
                                actionType: "runscript",
                                strParam1: fullscreenAndUnmute
                            }
                        ]
                    }));
                }, 2000); // Wait 2 seconds before running
            } 
            break;

        case 'Info':
            // console.log('Handling action for: More Info Button');
            break;

        case 'Google':
            // console.log('Handling action for: Google Button');
            break;

        default:
            // console.log('An unknown button triggered the custom event.');
    }
});

// FireScreen and YouTube Player Volume Controls
const mediaControlScript = `
(function() {
    // --- Universal Media Control Function ---
    // This function will be called from the Banter space to control media inside the browser.
    window.fireScreenMediaControl = function(options) {
        const { volume, mute } = options;

        function controlMedia(doc) {
            // 1. Find all standard HTML5 video and audio elements
            doc.querySelectorAll('video, audio').forEach(el => {
                try {
                    if (volume !== undefined && 'volume' in el && !el.muted) {
                        el.volume = volume;
                    }
                    if (mute !== undefined && 'muted' in el) {
                        el.muted = mute;
                    }
                } catch (e) { /* console.error('[FireScreen] Error controlling HTML5 media:', e); */ }
            });

            // 2. Attempt to control common third-party players (e.g., YouTube)
            const ytPlayer = doc.querySelector('.html5-video-player');
            if (ytPlayer) {
                try {
                    if (volume !== undefined && typeof ytPlayer.setVolume === 'function') {
                        ytPlayer.setVolume(volume * 100);
                    }
                    if (mute !== undefined) {
                        if (mute && typeof ytPlayer.mute === 'function') ytPlayer.mute();
                        if (!mute && typeof ytPlayer.unMute === 'function') ytPlayer.unMute();
                    }
                } catch(e) { /* console.error('[FireScreen] Error controlling YouTube player:', e); */ }
            }

            // 3. Recursively search within iframes
            doc.querySelectorAll('iframe').forEach(iframe => {
                try {
                    if (iframe.contentDocument) controlMedia(iframe.contentDocument);
                } catch (e) { /* Cross-origin iFrames will throw errors, which is expected. */ }
            });
        }
        controlMedia(window.document);
    };
})();
`;


async function youtubePlayerControl(value, action = null) {
    const core = window.videoPlayerCore; if (!core) return;
    const methodName = (action === "mute" || action === "openPlaylist") ? action : "volume"; // Choose the method name based on the action.
    if (typeof core[methodName] !== "function") return;  // Only call if it's a function.
    return methodName === "volume" ? core[methodName](value) : core[methodName](); // Call with or without the value argument.
};
  

function runBrowserActions(firebrowser, script) {
  firebrowser.RunActions(JSON.stringify({"actions": [{ "actionType": "runscript","strparam1": script }]}));
};


function adjustForAll(action, change) {
  // Iterate over all registered FireScreen instances
  for (const instanceId in window.fireScreenInstances) {
    const instance = window.fireScreenInstances[instanceId];
    if (instance && instance.browserComponent) {
      const thebrowserpart = instance.browserComponent;

      switch (action) {
        case "adjustVolume":
          adjustVolume(thebrowserpart, change);
          break;
        case "toggleMute":
          thebrowserpart.muteState = !thebrowserpart.muteState;
          const scriptToRun = `${mediaControlScript} window.fireScreenMediaControl({ mute: ${thebrowserpart.muteState} });`;
          runBrowserActions(thebrowserpart, scriptToRun);
          break;
      }
      console.log(`adjustForAll: Action '${action}' applied to instance ${instanceId}`);
    } else {
      console.warn(`adjustForAll: Could not find browser instance ${instanceId}. It might have been cleaned up or not initialized correctly.`);
    }
  }
}


function adjustVolume(firebrowser, change) { // Pass -1 to decrease the volume Pass 1 to increase the volume
  let firevolume = firebrowser.volumeLevel;
  let currentVolume = Number(firevolume); let adjustment;
  if (currentVolume < 0.1) { adjustment = 0.01; // Tiny adjustment for low volume
  } else if (currentVolume < 0.5) { adjustment = 0.03; // Medium adjustment for medium volume
  } else { adjustment = 0.05; } // Big adjustment for high volume

  let newVolume = currentVolume + (change * adjustment);
  newVolume = Math.max(0, Math.min(newVolume, 1)).toFixed(2);
  firebrowser.volumeLevel = newVolume;

  console.log(`FIRESCREEN2: Setting volume to: ${newVolume}`);
  // Inject the control script and immediately execute the command.
  const scriptToRun = `${mediaControlScript} window.fireScreenMediaControl({ volume: ${newVolume} });`;
  runBrowserActions(firebrowser, scriptToRun);
};

/*
adjustForAll("adjustVolume", 1); youtubePlayerControl(1);
adjustForAll("adjustVolume", -1); youtubePlayerControl(0);
adjustForAll("toggleMute"); youtubePlayerControl(null, "mute");
*/
