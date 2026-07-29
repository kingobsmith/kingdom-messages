export interface Track {
  id: string;
  name: string;
  url: string;
}

export const TRACKS: Track[] = [
  {
    id: "letter-td-jakes-joel-osteen",
    name: "Letter to TD Jakes & Joel Osteen",
    url: "https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/f4320628-d995-4dcf-87bc-039fd2895356/Letter-to-TD-Jakes-Joel-Osteen.mp3",
  },
  {
    id: "letter-industry-remix-2",
    name: "Letter to The Industry Remix 2",
    url: "https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/259e2053-1cfc-4bfc-965d-26857a9eca0f/Letter-to-The-Industry-Remix-2.mp3",
  },
  {
    id: "letter-industry-3",
    name: "Letter to the Industry 3",
    url: "https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/72553b4e-db7e-4105-862d-00d6875f48df/Letter-to-the-Industry-3.mp3",
  },
  {
    id: "the-prophecy-5",
    name: "The Prophecy 5",
    url: "https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/994142fc-8af4-4691-8ecf-ab5e90d4c34c/The-Prophecy-5.mp3",
  },
  {
    id: "the-rapture-6",
    name: "The Rapture 6",
    url: "https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/5d6f3364-9599-49df-a5d3-0c90e8970d23/The-Rapture-6.mp3",
  },
  {
    id: "america-1-7",
    name: "America 1 7",
    url: "https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/54fa8695-47a3-49a8-b5b5-e7e6645bb60b/America-1-7.mp3",
  },
  {
    id: "america-8",
    name: "America 8",
    url: "https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/2da7d00b-a981-421c-b93d-d9b75605ac16/America-8.mp3",
  },
  {
    id: "he-left-us-men-in-charge-10",
    name: "He Left Us Men in Charge 10",
    url: "https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/f485d2d4-efa6-46b7-b4d8-57c344ebaa3f/He-Left-Us-Men-in-Charge-10.mp3",
  },
  {
    id: "i-am-the-proof-11",
    name: "I Am The Proof 11",
    url: "https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/4dda6363-f9f0-44db-a1ac-b1ab29637359/I-Am-The-Proof-11.mp3",
  },
  {
    id: "letter-jay-z-12",
    name: "Letter to Jay-Z 12",
    url: "https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/bbbf1ee4-7c16-47fd-ab82-e4d05ad49e42/Letter-to-Jay-Z-12.mp3",
  },
];

export function getTrackById(id: string): Track | undefined {
  return TRACKS.find((t) => t.id === id);
}
