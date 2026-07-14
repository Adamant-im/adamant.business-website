---
title: "Telegram’s Anonymity Hole: How to get any user’s phone number"
slug: "telegram-s-anonymity-hole-how-to-get-any-user-s-phone-number-88062b4fb94b"
description: "Telegram requires a phone number to begin messaging, binding all messages to a user's identity. This mechanism is not only obsolete but introduces significant privacy risks. One…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/telegrams-anonymity-hole-how-to-get-any-user-s-phone-number-88062b4fb94b"
publishedAt: "2019-09-02T08:18:08.034Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/88062b4fb94b/001-0-mhckpcqqduw4kpcb.webp"
cardSpan: "full"
originalId: "medium:88062b4fb94b"
locale: "en"
placeholder: false
---

Telegram requires a phone number to begin messaging, binding all messages to a user's identity. This mechanism is not only obsolete but introduces significant privacy risks. One such vulnerability allows anyone to obtain the phone number of a user in a Telegram group by exploiting the app's contact synchronization feature.

To demonstrate, consider an open group chat where a target user, "Sergey Lebedev," is visible.

![Telegram’s Anonymity Hole: How to get any user’s phone number](/images/engineering-notes/medium/88062b4fb94b/002-0-fcieyaa3mo5op3nv.webp)

By leaving the application and adding a new contact to the device's native contact book with a guessed phone number, we can test if that number belongs to a Telegram user.

![Telegram’s Anonymity Hole: How to get any user’s phone number](/images/engineering-notes/medium/88062b4fb94b/003-0-usc809xtvbg9yqgn.webp)

Next, ensure that contact synchronization is enabled in Telegram's privacy settings (Settings — Privacy and Security). This feature automatically adds device contacts to the application if they are registered on Telegram.

![Telegram’s Anonymity Hole: How to get any user’s phone number](/images/engineering-notes/medium/88062b4fb94b/004-0-bpxhl6k-bs5uhotz.webp)

If the guessed phone number is registered in Telegram, the application will add the user to its contact list. In this example, the guessed number was correct.

![Telegram’s Anonymity Hole: How to get any user’s phone number](/images/engineering-notes/medium/88062b4fb94b/005-0-ajrqdbdxby-cjw0f.webp)

Telegram will then override the user's display name with the name assigned in the device's contact book. Returning to the original group chat, "Sergey Lebedev" is now displayed as "Testing Phone ID," confirming the guessed phone number belongs to him.

![Telegram’s Anonymity Hole: How to get any user’s phone number](/images/engineering-notes/medium/88062b4fb94b/006-0-qbjxtb52xz7x-fzs.webp)

While guessing a phone number out of millions seems impractical, attackers can significantly narrow the range using social engineering to determine the target's country and carrier. Furthermore, a simple mobile application could automate adding large ranges of phone numbers to a device's address book, making brute-force discovery feasible. This vulnerability poses a severe threat to user privacy, particularly for public figures, investors, and activists. Applications that mandate phone number registration often carry hidden privacy trade-offs.
