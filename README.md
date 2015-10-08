# Industry Expo Bolt CMS Theme

This is the Industry Project Expo theme for [Bolt CMS](https://bolt.cm), based on the ["base-2014"](https://github.com/bolt/base-2014) theme for Bolt. It is built with [Pure CSS](http://purecss.io) and [Compass](http://compass-style.org).

## Requirements

* [Node.js](https://nodejs.org/en/) and [Ruby](https://www.ruby-lang.org/en/) installed.
* Grunt and bower: `npm install bower grunt-cli -g`
* Compass & Modular Scale: `gem install compass modular-scale`

## Installation

1. Change to Bolt CMS theme/ dir: `cd /path/to/Bolt/theme`
2. Clone repo: `git clone https://github.com/ellsclytn/Industry-Expo.git 'industry-expo'`
3. Move to theme dir `cd industry-expo`
4. Install dependencies: `npm install`
    * This runs `bower install` for you!
5. Set `theme: industry-expo` in `app/config/config.yml`
6. Start grunt: `grunt`

### Browser Sync

The Browser Sync grunt task assumes that the host `boltcms.local` (<http://boltcms.local>) is used to access the Bolt CMS installation, make the necessary change in your hosts file for this to work properly. Without this auto page refresh won't work!
