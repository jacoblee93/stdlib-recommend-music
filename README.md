# README

This service attempts to find the most popular artist matching your input string, and
returns song suggestions based on the artist. For example, sending the following request:

```
https://jacoblee.stdlib.com/recommendMusic?artist=tove%20lo
```

Yields an array of 5 songs that we recommend based on Tove Lo as an input:

```
[
  "TG4M by Zara Larsson",
  "Castle by Halsey",
  "How To Be A Heartbreaker by Marina and the Diamonds",
  "Kamikaze by MØ",
  "Team by Lorde"
]
```
