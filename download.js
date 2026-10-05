// Enable the installer link only after GitHub publishes the verified preview.
(async () => {
  const link = document.getElementById('windows-download');
  const status = document.getElementById('download-status');
  if (!link || !status) return;
  const repository = 'arcanaforgeapp-oss/arcana-forge-website';
  const tag = 'v0.14.9w-rc.8';
  const assetName = 'Arcana-Forge-0.14.9w-rc.8-Setup.exe';
  const expectedURL = `https://github.com/${repository}/releases/download/${tag}/${assetName}`;
  try {
    const response = await fetch(`https://api.github.com/repos/${repository}/releases?per_page=20`, {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (!response.ok) throw new Error('Release information unavailable');
    const releases = await response.json();
    const release = Array.isArray(releases) && releases.find(item => item.tag_name === tag && !item.draft);
    const asset = release && release.assets.find(item => item.name === assetName && item.browser_download_url === expectedURL && item.size > 0);
    if (!asset) {
      status.textContent = 'The Windows installer is being uploaded. This page will offer the download when publication completes.';
      return;
    }
    link.href = expectedURL;
    link.textContent = 'Download the Windows preview ✦';
    status.textContent = `RC8 preview · ${Math.ceil(asset.size / 1000000)} MB · 64-bit Windows 10 / 11`;
  } catch {
    status.textContent = 'Check GitHub releases for the latest Windows download and release notes.';
  }
})();
