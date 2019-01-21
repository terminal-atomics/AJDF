# Automated James Defense System
The Automated James Defense System is an automated system is a discord server spam protection system.

It automatically quarantines users deemed suspicious and waits for manual review from a moderator.

## Algorithm

The algorithm powering AJDS is a simple score-based system. In the end, a final score is obtainable that determines how likely one is to be a trustable.

Each scoring factor is assigned a point value that weighs it compared to other factors. Points only weigh
positively. The following are these factors:

- **Non-default profile picture** 5 pts
  - **Non-simple profile pic** max 4 pts on top
- **Verified Email** 5 pts
- **Account age** from 0 to 10 pts where
	- After 2 days of no increase, it goes up 1 pt every 2 days of age
- **Nitro Membership** 8 pts
  - 5 pts on top if full Nitro.
- **Hypesquad Membership** 4 pts
- **2FA Enabled** 4 pts
- **Inoffensive Username** 6 pts
- **Short Username** 0 to 4 pts
	- -1 pt for 4 characters
- **Connections** 0 to 10 pts
  - 2 pts per connection


The max theoretical score is 65 points.
A good minimum score is 35 points.

### How an image is detected to be non-simple

Image is detected to be non-simple based on it's
color distance computed with the following formula:
![Color Distance Formula](distance.svg) 
where R<sub>2</sub>/G<sub>2</sub>/B<sub>2</sub> is
equal to the highest color value in each channel and
R<sub>1</sub>/G<sub>1</sub>/B<sub>1</sub> is equal to
the lowest color value in each channel.

A distance of 196 is considered the full, max 4 points.

## Verification flow

1. The user joins the server and is placed in an
intro channel where they cannot type. It contains a
link to the verification website with a note about
privacy and what is about to happen.
3. The user clicks the link to login and is taken
to the Discord OAuth2 login page, where they can
consent to the application or cancel the process.
4. If they cancel, they will be taken to an error page.
Otherwise, they will be taken to a "Verifying" page.
In the background, the server scores their user and
the page will check the server status repeatedly to
know when to redirect.
5. When the server reports the final score, it will
release the user if they score well enough. The page
will be redirected to either a success or failure
message.
6. When the user goes back into Discord, they will
either be able to go straight into the server or
will be placed in some form of quarantine. It may
also be possible to outright ban them.

This flow should take max 15 seconds.

## Outline of Privacy Policy

Points that must be made when collecting user's data
for verification:
- Email is not stored, shared, or used.
- Connections will not be stored, shared, or used.
- No Discord user data will be shared
- API access token will not be stored or shared. It
  will only be used within the verification process.
- Only the user's ID, the score they received, and 
  when they were last scored, will be stored for record 
  purposes and to prevent circumvention.
- The user's username (without discriminator) will 
  be sent to an external service to be scanned for
  profanity. Terminal Atomics and its members cannot
  guarantee that this won't be stored.