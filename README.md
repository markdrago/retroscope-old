# Retroscope

A retroscope records video and then displays it after a delay.  This
creates a cool effect where you can watch replays of what just
happened.

### Technology

- This retroscope makes use of some HTML5 features:
    - MediaStream (camera access)
    - Canvas (video scraping)
    - Data URLs (displaying video frames)

### Recommended Uses

- Office Environment (conversation starter)
- Parties (see yourself arrive, watch replays of funny moments)
- Board Game Night (watch yourself perform in charades)
- Toddler Entertainment

### Usage

- Access the page using a publicly accessible webserver (try `python -m SimpleHTTPServer`)

- Using chrome, make sure "Enable PeerConnection" and "Enable Media Source API on <video> elements" are **activated** in `chrome://flags/`