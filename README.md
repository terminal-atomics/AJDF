# Automated James Defense System
The Automated James Defense System is an automated system is a discord server spam protection system.

It automatically quarantines users deemed suspicious and waits for manual review from a moderator.

## Algorithm

The algorithm powering AJDS is a simple score-based system. In the end, a final score is obtainable that determines how likely one is to be a trustable.

Each scoring factor is assigned a point value that weighs it compared to other factors. Points only weigh
positively. The following are these factors:

- **Non-default profile picture** 5 pts
  - **Non-simple profile pic** 4 pts on top
- **Verified Email** 5 pts
- **Account age** from 0 to 10 pts where
	- After 2 days of no increase, it goes up 1 pt every 2 days of age
- **Nitro Membership** 8 pts
  - 5 pts on top if full Nitro.
- **Hypesquad Membership** 4 pts
- **2FA Enabled** 4 pts
- **Inoffensive Username** 0 to 6 pts
  - -2 pt for every detected curse word
- **Short Username** 0 to 4 pts
	- -1 pt for 4 characters


The max theoretical score is 50 pts.
Multiply by 2 to receive a percentage
of trust. A proposed minimum percentage of trust would
be 30% A more conservative minimum percentage of trust would be 50%.