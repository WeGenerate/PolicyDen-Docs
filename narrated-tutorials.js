// Keep captions with their page: Mintlify strips track tags and does not serve
// VTT files directly. Use the browser's native caption track and cue APIs.
(() => {
  const attached = new WeakMap();

  function attachTutorialCaptions() {
    for (const video of document.querySelectorAll('video[data-tutorial-captions]')) {
      const serialized = video.getAttribute('data-tutorial-captions');
      const previous = attached.get(video);
      if (previous?.serialized === serialized) continue;
      try {
        const cues = JSON.parse(serialized);
        if (!Array.isArray(cues) || !cues.length) continue;
        const track = previous?.track || video.addTextTrack('captions', 'English', 'en');
        while (track.cues?.length) track.removeCue(track.cues[0]);
        for (const cue of cues) {
          if (!Number.isFinite(cue.start) || !Number.isFinite(cue.end) || cue.start < 0 || cue.end <= cue.start || typeof cue.text !== 'string') continue;
          track.addCue(new VTTCue(cue.start, cue.end, cue.text));
        }
        track.mode = 'showing';
        attached.set(video, { serialized, track });
      } catch (error) {
        console.warn('Unable to initialize tutorial captions. The transcript is available below the video.');
      }
    }
  }

  attachTutorialCaptions();
  window.addEventListener('mintlify:navigate', attachTutorialCaptions);
})();
