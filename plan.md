Yes — **create a new website from scratch**. Do **not** wait for an existing site, because the product BJ described is one custom web app with secure messaging, unlock pages, music attachment, and Kingdom Chamber sections all inside one project. [vercel](https://vercel.com/docs/projects)

Build it as **one new app** named **kingdom-messages** on Vercel, with multiple pages/routes inside it. TOTP-based message access, QR-linked entry, and the Kingdom Chamber structure are all app features that need a custom build rather than a simple content edit on an old site. [firebase.google](https://firebase.google.com/docs/auth/web/totp-mfa)

## What to build

You are building **one website/app** with these main parts:

- Admin side for BJ
- Recipient secure message flow
- Kingdom Chamber pages
- Public info pages like bio/books/apply

This is the full structure:

| Route | Purpose |
|---|---|
| `/` | Landing page for Kingdom Messages |
| `/admin/messages/new` | BJ creates secure message |
| `/admin/messages` | List of created messages |
| `/m/[id]` | Recipient unlock page |
| `/m/[id]/view` | Royal message page after unlock |
| `/bio` | BJ bio page |
| `/books` | Books/store page |
| `/apply` | Apply/request invitation page |
| `/kingdom-chamber` | Chamber landing page |
| `/kingdom-chamber/churches` | Approved Churches & Ministries |
| `/kingdom-chamber/speakers` | Speaker Bureaus |
| `/kingdom-chamber/gods-chosen` | Gods Chosen profiles |

## Landing page content

On the homepage `/`, add:

- Hero title: **Kingdom Messages**
- Subtitle: private, royal communication for pastors, players, stars, and leaders
- Short explanation:
  - secure message delivery through unique links and QR codes,
  - Google Authenticator-style code access,
  - curated music attached to each message,
  - Kingdom Chamber for approved members. [webflow](https://webflow.com/blog/secure-messaging-apps)

Homepage sections:

1. **Hero**
- “Private communication with a royal touch.”

2. **How it works**
- Create message
- Send QR/link
- Recipient unlocks with code
- Music plays while they read [loginradius](https://www.loginradius.com/blog/engineering/what-is-totp-authentication)

3. **Who it’s for**
- pastors
- churches
- ministries
- athletes
- artists
- politicians
- public speakers

4. **Kingdom Chamber preview**
- Churches & Ministries
- Speaker Bureaus
- Gods Chosen

5. **Call to action**
- Apply / Request Invitation

## Admin page content

On `/admin/messages/new`, create form fields:

- Recipient name
- Recipient email or phone
- Message title
- Message body
- Track dropdown
- Expiration date
- Optional file upload

Track dropdown must use this exact order:

1. Letter to TD Jakes & Joel Osteen [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/f4320628-d995-4dcf-87bc-039fd2895356/Letter-to-TD-Jakes-Joel-Osteen.mp3?AWSAccessKeyId=ASIA2F3EMEYE7BHYCS32&Signature=KCQlzxklmbNiVooFABkD7cwaeL8%3D&x-amz-security-token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCDhA4i8CH45rPku21EROCmiPTazXd%2FqX95I5%2FdWM5LEwIgVuIsX6CpkqshEZ133S%2FCdn1wx4SznQBGCUr8bG3Dgtwq8wQIexABGgw2OTk3NTMzMDk3MDUiDA50bMKnvrkX4mQxUyrQBJevKxFe5xkEWb09ghn59Yp4wfGZuV3w59ZetPm%2B0Tmmq6JAwi9PMPZn%2F%2FcyknW6QNzI1sTX4PmA9FqVOcrU%2FxgUH5gEX3CrqF0Y%2FXhbiX1Mf1yev%2B7RPOGNV0jhzjwEgAlA5aiv1ffgn%2F%2FWA6cab%2BxtXSh51JKcr6NmEn6045z2FSsklNPUjjkWaCRqjoB07Lw%2FggruhM6vFIm9GzAZHaPn37O7eDC5PruJ02rwZXd3UfdHBMEm%2Bbld9Cld31P5t7Q7dW7nTrC00lLLFhzva8EmcfsWBTaUnCanelkdle5pTsvq7D5eb9FArKceL3SQqdwDjCrU0QwlYgTBLZ6%2FLNEByzgJ6tJHfY7LID0BS8gBmHYd6ZEkNypLJu4q6NVthE7i2XtoM51dqYdMTXAf46piskrhfmuACQrLvXxdLLFGKtBLZF2cichTKRt5zrDDAyZISCcOaOGKse4uclZyDVzzHrolZFHF93PRK2frto5dIKoUCc%2BDeERzkHV%2FRjPXCPjpZGbyrAvPBOxXG1tF0fsTcjTAj38eHNAiwYhEzd4dZvONQjso9HXr9FJDv93RkgT%2FY2cYTN%2B0qoI%2FJjAaoE%2FWcANKy%2BI45RzLqFlq96lHgVKORBheEVMby%2BjUhurtNcgbDRoU5a%2B%2BJEf8yjA6d3iUSiUv6mmtzV4tVop1hvI12I225slQpjBAtY4RwIGHecmcb4wDM64imDX%2Bos6gXq9cK00Ku%2B6%2BTKtS8WSL975wwKnSdoebdFdk9b3%2FA%2FNHQojNt5%2F9HcutsIluHyZ9xrowho2n0wY6mAHUklLr6H4VaeBK%2BZ%2FLG14oNopSfIH%2BLEd1xGwga6Sm4jHfN35X1%2B%2FmcNNJKQzLYVC3gG45Y%2BeE9pBIfIfJaR%2FTwmSillI%2FjwxdyScS4iwzDOwl5CS54MV%2FSPmUBirHz6uVWR6wrN2zkyfh8WSOlN3eh2hOEnmTbwvEW55z%2FkC59ULx2p5gxpfsWTrogQxapZejTsWN3udeUA%3D%3D&Expires=1785320537)
2. Letter to The Industry Remix 2 [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/259e2053-1cfc-4bfc-965d-26857a9eca0f/Letter-to-The-Industry-Remix-2.mp3?AWSAccessKeyId=ASIA2F3EMEYE7BHYCS32&Signature=YaqGX64YNBorQwvKatl5ZBU8tzc%3D&x-amz-security-token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCDhA4i8CH45rPku21EROCmiPTazXd%2FqX95I5%2FdWM5LEwIgVuIsX6CpkqshEZ133S%2FCdn1wx4SznQBGCUr8bG3Dgtwq8wQIexABGgw2OTk3NTMzMDk3MDUiDA50bMKnvrkX4mQxUyrQBJevKxFe5xkEWb09ghn59Yp4wfGZuV3w59ZetPm%2B0Tmmq6JAwi9PMPZn%2F%2FcyknW6QNzI1sTX4PmA9FqVOcrU%2FxgUH5gEX3CrqF0Y%2FXhbiX1Mf1yev%2B7RPOGNV0jhzjwEgAlA5aiv1ffgn%2F%2FWA6cab%2BxtXSh51JKcr6NmEn6045z2FSsklNPUjjkWaCRqjoB07Lw%2FggruhM6vFIm9GzAZHaPn37O7eDC5PruJ02rwZXd3UfdHBMEm%2Bbld9Cld31P5t7Q7dW7nTrC00lLLFhzva8EmcfsWBTaUnCanelkdle5pTsvq7D5eb9FArKceL3SQqdwDjCrU0QwlYgTBLZ6%2FLNEByzgJ6tJHfY7LID0BS8gBmHYd6ZEkNypLJu4q6NVthE7i2XtoM51dqYdMTXAf46piskrhfmuACQrLvXxdLLFGKtBLZF2cichTKRt5zrDDAyZISCcOaOGKse4uclZyDVzzHrolZFHF93PRK2frto5dIKoUCc%2BDeERzkHV%2FRjPXCPjpZGbyrAvPBOxXG1tF0fsTcjTAj38eHNAiwYhEzd4dZvONQjso9HXr9FJDv93RkgT%2FY2cYTN%2B0qoI%2FJjAaoE%2FWcANKy%2BI45RzLqFlq96lHgVKORBheEVMby%2BjUhurtNcgbDRoU5a%2B%2BJEf8yjA6d3iUSiUv6mmtzV4tVop1hvI12I225slQpjBAtY4RwIGHecmcb4wDM64imDX%2Bos6gXq9cK00Ku%2B6%2BTKtS8WSL975wwKnSdoebdFdk9b3%2FA%2FNHQojNt5%2F9HcutsIluHyZ9xrowho2n0wY6mAHUklLr6H4VaeBK%2BZ%2FLG14oNopSfIH%2BLEd1xGwga6Sm4jHfN35X1%2B%2FmcNNJKQzLYVC3gG45Y%2BeE9pBIfIfJaR%2FTwmSillI%2FjwxdyScS4iwzDOwl5CS54MV%2FSPmUBirHz6uVWR6wrN2zkyfh8WSOlN3eh2hOEnmTbwvEW55z%2FkC59ULx2p5gxpfsWTrogQxapZejTsWN3udeUA%3D%3D&Expires=1785320537)
3. Letter to the Industry 3 [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/72553b4e-db7e-4105-862d-00d6875f48df/Letter-to-the-Industry-3.mp3?AWSAccessKeyId=ASIA2F3EMEYE7BHYCS32&Signature=x%2Bw43S84O9XtbecgTMIht%2F3Ow%2B8%3D&x-amz-security-token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCDhA4i8CH45rPku21EROCmiPTazXd%2FqX95I5%2FdWM5LEwIgVuIsX6CpkqshEZ133S%2FCdn1wx4SznQBGCUr8bG3Dgtwq8wQIexABGgw2OTk3NTMzMDk3MDUiDA50bMKnvrkX4mQxUyrQBJevKxFe5xkEWb09ghn59Yp4wfGZuV3w59ZetPm%2B0Tmmq6JAwi9PMPZn%2F%2FcyknW6QNzI1sTX4PmA9FqVOcrU%2FxgUH5gEX3CrqF0Y%2FXhbiX1Mf1yev%2B7RPOGNV0jhzjwEgAlA5aiv1ffgn%2F%2FWA6cab%2BxtXSh51JKcr6NmEn6045z2FSsklNPUjjkWaCRqjoB07Lw%2FggruhM6vFIm9GzAZHaPn37O7eDC5PruJ02rwZXd3UfdHBMEm%2Bbld9Cld31P5t7Q7dW7nTrC00lLLFhzva8EmcfsWBTaUnCanelkdle5pTsvq7D5eb9FArKceL3SQqdwDjCrU0QwlYgTBLZ6%2FLNEByzgJ6tJHfY7LID0BS8gBmHYd6ZEkNypLJu4q6NVthE7i2XtoM51dqYdMTXAf46piskrhfmuACQrLvXxdLLFGKtBLZF2cichTKRt5zrDDAyZISCcOaOGKse4uclZyDVzzHrolZFHF93PRK2frto5dIKoUCc%2BDeERzkHV%2FRjPXCPjpZGbyrAvPBOxXG1tF0fsTcjTAj38eHNAiwYhEzd4dZvONQjso9HXr9FJDv93RkgT%2FY2cYTN%2B0qoI%2FJjAaoE%2FWcANKy%2BI45RzLqFlq96lHgVKORBheEVMby%2BjUhurtNcgbDRoU5a%2B%2BJEf8yjA6d3iUSiUv6mmtzV4tVop1hvI12I225slQpjBAtY4RwIGHecmcb4wDM64imDX%2Bos6gXq9cK00Ku%2B6%2BTKtS8WSL975wwKnSdoebdFdk9b3%2FA%2FNHQojNt5%2F9HcutsIluHyZ9xrowho2n0wY6mAHUklLr6H4VaeBK%2BZ%2FLG14oNopSfIH%2BLEd1xGwga6Sm4jHfN35X1%2B%2FmcNNJKQzLYVC3gG45Y%2BeE9pBIfIfJaR%2FTwmSillI%2FjwxdyScS4iwzDOwl5CS54MV%2FSPmUBirHz6uVWR6wrN2zkyfh8WSOlN3eh2hOEnmTbwvEW55z%2FkC59ULx2p5gxpfsWTrogQxapZejTsWN3udeUA%3D%3D&Expires=1785320537)
4. The Prophecy 5 [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/994142fc-8af4-4691-8ecf-ab5e90d4c34c/The-Prophecy-5.mp3?AWSAccessKeyId=ASIA2F3EMEYE7BHYCS32&Signature=l0qeYacoUVxNW5tfH0aF1GASDKE%3D&x-amz-security-token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCDhA4i8CH45rPku21EROCmiPTazXd%2FqX95I5%2FdWM5LEwIgVuIsX6CpkqshEZ133S%2FCdn1wx4SznQBGCUr8bG3Dgtwq8wQIexABGgw2OTk3NTMzMDk3MDUiDA50bMKnvrkX4mQxUyrQBJevKxFe5xkEWb09ghn59Yp4wfGZuV3w59ZetPm%2B0Tmmq6JAwi9PMPZn%2F%2FcyknW6QNzI1sTX4PmA9FqVOcrU%2FxgUH5gEX3CrqF0Y%2FXhbiX1Mf1yev%2B7RPOGNV0jhzjwEgAlA5aiv1ffgn%2F%2FWA6cab%2BxtXSh51JKcr6NmEn6045z2FSsklNPUjjkWaCRqjoB07Lw%2FggruhM6vFIm9GzAZHaPn37O7eDC5PruJ02rwZXd3UfdHBMEm%2Bbld9Cld31P5t7Q7dW7nTrC00lLLFhzva8EmcfsWBTaUnCanelkdle5pTsvq7D5eb9FArKceL3SQqdwDjCrU0QwlYgTBLZ6%2FLNEByzgJ6tJHfY7LID0BS8gBmHYd6ZEkNypLJu4q6NVthE7i2XtoM51dqYdMTXAf46piskrhfmuACQrLvXxdLLFGKtBLZF2cichTKRt5zrDDAyZISCcOaOGKse4uclZyDVzzHrolZFHF93PRK2frto5dIKoUCc%2BDeERzkHV%2FRjPXCPjpZGbyrAvPBOxXG1tF0fsTcjTAj38eHNAiwYhEzd4dZvONQjso9HXr9FJDv93RkgT%2FY2cYTN%2B0qoI%2FJjAaoE%2FWcANKy%2BI45RzLqFlq96lHgVKORBheEVMby%2BjUhurtNcgbDRoU5a%2B%2BJEf8yjA6d3iUSiUv6mmtzV4tVop1hvI12I225slQpjBAtY4RwIGHecmcb4wDM64imDX%2Bos6gXq9cK00Ku%2B6%2BTKtS8WSL975wwKnSdoebdFdk9b3%2FA%2FNHQojNt5%2F9HcutsIluHyZ9xrowho2n0wY6mAHUklLr6H4VaeBK%2BZ%2FLG14oNopSfIH%2BLEd1xGwga6Sm4jHfN35X1%2B%2FmcNNJKQzLYVC3gG45Y%2BeE9pBIfIfJaR%2FTwmSillI%2FjwxdyScS4iwzDOwl5CS54MV%2FSPmUBirHz6uVWR6wrN2zkyfh8WSOlN3eh2hOEnmTbwvEW55z%2FkC59ULx2p5gxpfsWTrogQxapZejTsWN3udeUA%3D%3D&Expires=1785320537)
5. The Rapture 6 [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/5d6f3364-9599-49df-a5d3-0c90e8970d23/The-Rapture-6.mp3?AWSAccessKeyId=ASIA2F3EMEYE7BHYCS32&Signature=vEhnVVbZ0z%2BNPDvL%2Fk6q9C73irQ%3D&x-amz-security-token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCDhA4i8CH45rPku21EROCmiPTazXd%2FqX95I5%2FdWM5LEwIgVuIsX6CpkqshEZ133S%2FCdn1wx4SznQBGCUr8bG3Dgtwq8wQIexABGgw2OTk3NTMzMDk3MDUiDA50bMKnvrkX4mQxUyrQBJevKxFe5xkEWb09ghn59Yp4wfGZuV3w59ZetPm%2B0Tmmq6JAwi9PMPZn%2F%2FcyknW6QNzI1sTX4PmA9FqVOcrU%2FxgUH5gEX3CrqF0Y%2FXhbiX1Mf1yev%2B7RPOGNV0jhzjwEgAlA5aiv1ffgn%2F%2FWA6cab%2BxtXSh51JKcr6NmEn6045z2FSsklNPUjjkWaCRqjoB07Lw%2FggruhM6vFIm9GzAZHaPn37O7eDC5PruJ02rwZXd3UfdHBMEm%2Bbld9Cld31P5t7Q7dW7nTrC00lLLFhzva8EmcfsWBTaUnCanelkdle5pTsvq7D5eb9FArKceL3SQqdwDjCrU0QwlYgTBLZ6%2FLNEByzgJ6tJHfY7LID0BS8gBmHYd6ZEkNypLJu4q6NVthE7i2XtoM51dqYdMTXAf46piskrhfmuACQrLvXxdLLFGKtBLZF2cichTKRt5zrDDAyZISCcOaOGKse4uclZyDVzzHrolZFHF93PRK2frto5dIKoUCc%2BDeERzkHV%2FRjPXCPjpZGbyrAvPBOxXG1tF0fsTcjTAj38eHNAiwYhEzd4dZvONQjso9HXr9FJDv93RkgT%2FY2cYTN%2B0qoI%2FJjAaoE%2FWcANKy%2BI45RzLqFlq96lHgVKORBheEVMby%2BjUhurtNcgbDRoU5a%2B%2BJEf8yjA6d3iUSiUv6mmtzV4tVop1hvI12I225slQpjBAtY4RwIGHecmcb4wDM64imDX%2Bos6gXq9cK00Ku%2B6%2BTKtS8WSL975wwKnSdoebdFdk9b3%2FA%2FNHQojNt5%2F9HcutsIluHyZ9xrowho2n0wY6mAHUklLr6H4VaeBK%2BZ%2FLG14oNopSfIH%2BLEd1xGwga6Sm4jHfN35X1%2B%2FmcNNJKQzLYVC3gG45Y%2BeE9pBIfIfJaR%2FTwmSillI%2FjwxdyScS4iwzDOwl5CS54MV%2FSPmUBirHz6uVWR6wrN2zkyfh8WSOlN3eh2hOEnmTbwvEW55z%2FkC59ULx2p5gxpfsWTrogQxapZejTsWN3udeUA%3D%3D&Expires=1785320537)
6. America 1 7 [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/54fa8695-47a3-49a8-b5b5-e7e6645bb60b/America-1-7.mp3?AWSAccessKeyId=ASIA2F3EMEYE7BHYCS32&Signature=Ot%2F8cUSyDNGE6h9AbDD%2FNOwAYZY%3D&x-amz-security-token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCDhA4i8CH45rPku21EROCmiPTazXd%2FqX95I5%2FdWM5LEwIgVuIsX6CpkqshEZ133S%2FCdn1wx4SznQBGCUr8bG3Dgtwq8wQIexABGgw2OTk3NTMzMDk3MDUiDA50bMKnvrkX4mQxUyrQBJevKxFe5xkEWb09ghn59Yp4wfGZuV3w59ZetPm%2B0Tmmq6JAwi9PMPZn%2F%2FcyknW6QNzI1sTX4PmA9FqVOcrU%2FxgUH5gEX3CrqF0Y%2FXhbiX1Mf1yev%2B7RPOGNV0jhzjwEgAlA5aiv1ffgn%2F%2FWA6cab%2BxtXSh51JKcr6NmEn6045z2FSsklNPUjjkWaCRqjoB07Lw%2FggruhM6vFIm9GzAZHaPn37O7eDC5PruJ02rwZXd3UfdHBMEm%2Bbld9Cld31P5t7Q7dW7nTrC00lLLFhzva8EmcfsWBTaUnCanelkdle5pTsvq7D5eb9FArKceL3SQqdwDjCrU0QwlYgTBLZ6%2FLNEByzgJ6tJHfY7LID0BS8gBmHYd6ZEkNypLJu4q6NVthE7i2XtoM51dqYdMTXAf46piskrhfmuACQrLvXxdLLFGKtBLZF2cichTKRt5zrDDAyZISCcOaOGKse4uclZyDVzzHrolZFHF93PRK2frto5dIKoUCc%2BDeERzkHV%2FRjPXCPjpZGbyrAvPBOxXG1tF0fsTcjTAj38eHNAiwYhEzd4dZvONQjso9HXr9FJDv93RkgT%2FY2cYTN%2B0qoI%2FJjAaoE%2FWcANKy%2BI45RzLqFlq96lHgVKORBheEVMby%2BjUhurtNcgbDRoU5a%2B%2BJEf8yjA6d3iUSiUv6mmtzV4tVop1hvI12I225slQpjBAtY4RwIGHecmcb4wDM64imDX%2Bos6gXq9cK00Ku%2B6%2BTKtS8WSL975wwKnSdoebdFdk9b3%2FA%2FNHQojNt5%2F9HcutsIluHyZ9xrowho2n0wY6mAHUklLr6H4VaeBK%2BZ%2FLG14oNopSfIH%2BLEd1xGwga6Sm4jHfN35X1%2B%2FmcNNJKQzLYVC3gG45Y%2BeE9pBIfIfJaR%2FTwmSillI%2FjwxdyScS4iwzDOwl5CS54MV%2FSPmUBirHz6uVWR6wrN2zkyfh8WSOlN3eh2hOEnmTbwvEW55z%2FkC59ULx2p5gxpfsWTrogQxapZejTsWN3udeUA%3D%3D&Expires=1785320537)
7. America 8 [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/2da7d00b-a981-421c-b93d-d9b75605ac16/America-8.mp3?AWSAccessKeyId=ASIA2F3EMEYE7BHYCS32&Signature=xnMYXoWMe9fEyVaMe9Q0V4lulqQ%3D&x-amz-security-token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCDhA4i8CH45rPku21EROCmiPTazXd%2FqX95I5%2FdWM5LEwIgVuIsX6CpkqshEZ133S%2FCdn1wx4SznQBGCUr8bG3Dgtwq8wQIexABGgw2OTk3NTMzMDk3MDUiDA50bMKnvrkX4mQxUyrQBJevKxFe5xkEWb09ghn59Yp4wfGZuV3w59ZetPm%2B0Tmmq6JAwi9PMPZn%2F%2FcyknW6QNzI1sTX4PmA9FqVOcrU%2FxgUH5gEX3CrqF0Y%2FXhbiX1Mf1yev%2B7RPOGNV0jhzjwEgAlA5aiv1ffgn%2F%2FWA6cab%2BxtXSh51JKcr6NmEn6045z2FSsklNPUjjkWaCRqjoB07Lw%2FggruhM6vFIm9GzAZHaPn37O7eDC5PruJ02rwZXd3UfdHBMEm%2Bbld9Cld31P5t7Q7dW7nTrC00lLLFhzva8EmcfsWBTaUnCanelkdle5pTsvq7D5eb9FArKceL3SQqdwDjCrU0QwlYgTBLZ6%2FLNEByzgJ6tJHfY7LID0BS8gBmHYd6ZEkNypLJu4q6NVthE7i2XtoM51dqYdMTXAf46piskrhfmuACQrLvXxdLLFGKtBLZF2cichTKRt5zrDDAyZISCcOaOGKse4uclZyDVzzHrolZFHF93PRK2frto5dIKoUCc%2BDeERzkHV%2FRjPXCPjpZGbyrAvPBOxXG1tF0fsTcjTAj38eHNAiwYhEzd4dZvONQjso9HXr9FJDv93RkgT%2FY2cYTN%2B0qoI%2FJjAaoE%2FWcANKy%2BI45RzLqFlq96lHgVKORBheEVMby%2BjUhurtNcgbDRoU5a%2B%2BJEf8yjA6d3iUSiUv6mmtzV4tVop1hvI12I225slQpjBAtY4RwIGHecmcb4wDM64imDX%2Bos6gXq9cK00Ku%2B6%2BTKtS8WSL975wwKnSdoebdFdk9b3%2FA%2FNHQojNt5%2F9HcutsIluHyZ9xrowho2n0wY6mAHUklLr6H4VaeBK%2BZ%2FLG14oNopSfIH%2BLEd1xGwga6Sm4jHfN35X1%2B%2FmcNNJKQzLYVC3gG45Y%2BeE9pBIfIfJaR%2FTwmSillI%2FjwxdyScS4iwzDOwl5CS54MV%2FSPmUBirHz6uVWR6wrN2zkyfh8WSOlN3eh2hOEnmTbwvEW55z%2FkC59ULx2p5gxpfsWTrogQxapZejTsWN3udeUA%3D%3D&Expires=1785320537)
8. He Left Us Men in Charge 10 [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/f485d2d4-efa6-46b7-b4d8-57c344ebaa3f/He-Left-Us-Men-in-Charge-10.mp3?AWSAccessKeyId=ASIA2F3EMEYE7BHYCS32&Signature=PUejV2l2bvTVLZrXwpdX%2FhQHShc%3D&x-amz-security-token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCDhA4i8CH45rPku21EROCmiPTazXd%2FqX95I5%2FdWM5LEwIgVuIsX6CpkqshEZ133S%2FCdn1wx4SznQBGCUr8bG3Dgtwq8wQIexABGgw2OTk3NTMzMDk3MDUiDA50bMKnvrkX4mQxUyrQBJevKxFe5xkEWb09ghn59Yp4wfGZuV3w59ZetPm%2B0Tmmq6JAwi9PMPZn%2F%2FcyknW6QNzI1sTX4PmA9FqVOcrU%2FxgUH5gEX3CrqF0Y%2FXhbiX1Mf1yev%2B7RPOGNV0jhzjwEgAlA5aiv1ffgn%2F%2FWA6cab%2BxtXSh51JKcr6NmEn6045z2FSsklNPUjjkWaCRqjoB07Lw%2FggruhM6vFIm9GzAZHaPn37O7eDC5PruJ02rwZXd3UfdHBMEm%2Bbld9Cld31P5t7Q7dW7nTrC00lLLFhzva8EmcfsWBTaUnCanelkdle5pTsvq7D5eb9FArKceL3SQqdwDjCrU0QwlYgTBLZ6%2FLNEByzgJ6tJHfY7LID0BS8gBmHYd6ZEkNypLJu4q6NVthE7i2XtoM51dqYdMTXAf46piskrhfmuACQrLvXxdLLFGKtBLZF2cichTKRt5zrDDAyZISCcOaOGKse4uclZyDVzzHrolZFHF93PRK2frto5dIKoUCc%2BDeERzkHV%2FRjPXCPjpZGbyrAvPBOxXG1tF0fsTcjTAj38eHNAiwYhEzd4dZvONQjso9HXr9FJDv93RkgT%2FY2cYTN%2B0qoI%2FJjAaoE%2FWcANKy%2BI45RzLqFlq96lHgVKORBheEVMby%2BjUhurtNcgbDRoU5a%2B%2BJEf8yjA6d3iUSiUv6mmtzV4tVop1hvI12I225slQpjBAtY4RwIGHecmcb4wDM64imDX%2Bos6gXq9cK00Ku%2B6%2BTKtS8WSL975wwKnSdoebdFdk9b3%2FA%2FNHQojNt5%2F9HcutsIluHyZ9xrowho2n0wY6mAHUklLr6H4VaeBK%2BZ%2FLG14oNopSfIH%2BLEd1xGwga6Sm4jHfN35X1%2B%2FmcNNJKQzLYVC3gG45Y%2BeE9pBIfIfJaR%2FTwmSillI%2FjwxdyScS4iwzDOwl5CS54MV%2FSPmUBirHz6uVWR6wrN2zkyfh8WSOlN3eh2hOEnmTbwvEW55z%2FkC59ULx2p5gxpfsWTrogQxapZejTsWN3udeUA%3D%3D&Expires=1785320537)
9. I Am The Proof 11 [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/4dda6363-f9f0-44db-a1ac-b1ab29637359/I-Am-The-Proof-11.mp3?AWSAccessKeyId=ASIA2F3EMEYE7BHYCS32&Signature=iDkOBpSfBNF7TIWfu491w4U07uY%3D&x-amz-security-token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCDhA4i8CH45rPku21EROCmiPTazXd%2FqX95I5%2FdWM5LEwIgVuIsX6CpkqshEZ133S%2FCdn1wx4SznQBGCUr8bG3Dgtwq8wQIexABGgw2OTk3NTMzMDk3MDUiDA50bMKnvrkX4mQxUyrQBJevKxFe5xkEWb09ghn59Yp4wfGZuV3w59ZetPm%2B0Tmmq6JAwi9PMPZn%2F%2FcyknW6QNzI1sTX4PmA9FqVOcrU%2FxgUH5gEX3CrqF0Y%2FXhbiX1Mf1yev%2B7RPOGNV0jhzjwEgAlA5aiv1ffgn%2F%2FWA6cab%2BxtXSh51JKcr6NmEn6045z2FSsklNPUjjkWaCRqjoB07Lw%2FggruhM6vFIm9GzAZHaPn37O7eDC5PruJ02rwZXd3UfdHBMEm%2Bbld9Cld31P5t7Q7dW7nTrC00lLLFhzva8EmcfsWBTaUnCanelkdle5pTsvq7D5eb9FArKceL3SQqdwDjCrU0QwlYgTBLZ6%2FLNEByzgJ6tJHfY7LID0BS8gBmHYd6ZEkNypLJu4q6NVthE7i2XtoM51dqYdMTXAf46piskrhfmuACQrLvXxdLLFGKtBLZF2cichTKRt5zrDDAyZISCcOaOGKse4uclZyDVzzHrolZFHF93PRK2frto5dIKoUCc%2BDeERzkHV%2FRjPXCPjpZGbyrAvPBOxXG1tF0fsTcjTAj38eHNAiwYhEzd4dZvONQjso9HXr9FJDv93RkgT%2FY2cYTN%2B0qoI%2FJjAaoE%2FWcANKy%2BI45RzLqFlq96lHgVKORBheEVMby%2BjUhurtNcgbDRoU5a%2B%2BJEf8yjA6d3iUSiUv6mmtzV4tVop1hvI12I225slQpjBAtY4RwIGHecmcb4wDM64imDX%2Bos6gXq9cK00Ku%2B6%2BTKtS8WSL975wwKnSdoebdFdk9b3%2FA%2FNHQojNt5%2F9HcutsIluHyZ9xrowho2n0wY6mAHUklLr6H4VaeBK%2BZ%2FLG14oNopSfIH%2BLEd1xGwga6Sm4jHfN35X1%2B%2FmcNNJKQzLYVC3gG45Y%2BeE9pBIfIfJaR%2FTwmSillI%2FjwxdyScS4iwzDOwl5CS54MV%2FSPmUBirHz6uVWR6wrN2zkyfh8WSOlN3eh2hOEnmTbwvEW55z%2FkC59ULx2p5gxpfsWTrogQxapZejTsWN3udeUA%3D%3D&Expires=1785320537)
10. Letter to Jay-Z 12 [ppl-ai-file-upload.s3.amazonaws](https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/attachments/634884496/bbbf1ee4-7c16-47fd-ab82-e4d05ad49e42/Letter-to-Jay-Z-12.mp3?AWSAccessKeyId=ASIA2F3EMEYE7BHYCS32&Signature=letQKJB1HHzyEHv8%2FTRAmYmtdy4%3D&x-amz-security-token=IQoJb3JpZ2luX2VjELL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCDhA4i8CH45rPku21EROCmiPTazXd%2FqX95I5%2FdWM5LEwIgVuIsX6CpkqshEZ133S%2FCdn1wx4SznQBGCUr8bG3Dgtwq8wQIexABGgw2OTk3NTMzMDk3MDUiDA50bMKnvrkX4mQxUyrQBJevKxFe5xkEWb09ghn59Yp4wfGZuV3w59ZetPm%2B0Tmmq6JAwi9PMPZn%2F%2FcyknW6QNzI1sTX4PmA9FqVOcrU%2FxgUH5gEX3CrqF0Y%2FXhbiX1Mf1yev%2B7RPOGNV0jhzjwEgAlA5aiv1ffgn%2F%2FWA6cab%2BxtXSh51JKcr6NmEn6045z2FSsklNPUjjkWaCRqjoB07Lw%2FggruhM6vFIm9GzAZHaPn37O7eDC5PruJ02rwZXd3UfdHBMEm%2Bbld9Cld31P5t7Q7dW7nTrC00lLLFhzva8EmcfsWBTaUnCanelkdle5pTsvq7D5eb9FArKceL3SQqdwDjCrU0QwlYgTBLZ6%2FLNEByzgJ6tJHfY7LID0BS8gBmHYd6ZEkNypLJu4q6NVthE7i2XtoM51dqYdMTXAf46piskrhfmuACQrLvXxdLLFGKtBLZF2cichTKRt5zrDDAyZISCcOaOGKse4uclZyDVzzHrolZFHF93PRK2frto5dIKoUCc%2BDeERzkHV%2FRjPXCPjpZGbyrAvPBOxXG1tF0fsTcjTAj38eHNAiwYhEzd4dZvONQjso9HXr9FJDv93RkgT%2FY2cYTN%2B0qoI%2FJjAaoE%2FWcANKy%2BI45RzLqFlq96lHgVKORBheEVMby%2BjUhurtNcgbDRoU5a%2B%2BJEf8yjA6d3iUSiUv6mmtzV4tVop1hvI12I225slQpjBAtY4RwIGHecmcb4wDM64imDX%2Bos6gXq9cK00Ku%2B6%2BTKtS8WSL975wwKnSdoebdFdk9b3%2FA%2FNHQojNt5%2F9HcutsIluHyZ9xrowho2n0wY6mAHUklLr6H4VaeBK%2BZ%2FLG14oNopSfIH%2BLEd1xGwga6Sm4jHfN35X1%2B%2FmcNNJKQzLYVC3gG45Y%2BeE9pBIfIfJaR%2FTwmSillI%2FjwxdyScS4iwzDOwl5CS54MV%2FSPmUBirHz6uVWR6wrN2zkyfh8WSOlN3eh2hOEnmTbwvEW55z%2FkC59ULx2p5gxpfsWTrogQxapZejTsWN3udeUA%3D%3D&Expires=1785320537)

When form submits:

- create message ID
- save message
- generate message URL
- generate QR code for URL [nngroup](https://www.nngroup.com/articles/qr-code-guidelines/)

## Unlock page content

On `/m/[id]`, show:

- Logo/title
- Short text: “You have received a private Kingdom Message.”
- Input 1: email or phone
- Input 2: 6-digit code
- Unlock button

For today, use fake code check if needed; later replace with real TOTP. TOTP is the correct model for short-lived authenticator codes. [apps.apple](https://apps.apple.com/us/app/authentication-app-mfa-totp/id6443597953)

## Royal message page content

On `/m/[id]/view`, after unlock show:

- message title
- attached track name
- audio player
- message body
- optional attachment
- footer links:
  - Bio
  - Books
  - Kingdom Chamber
  - Apply

Visual style:

- dark/black background
- gold accents
- elegant typography
- clean “royal” look

## Kingdom Chamber content

### `/kingdom-chamber`
Landing page with intro text:

- “Kingdom Chamber is a curated network of approved businesses, Churches, Ministries, speakers, and public leaders.”

Then 3 section cards:

- Approved Churches & Ministries
- Speaker Bureaus
- Gods Chosen

### `/kingdom-chamber/churches`
Content to add:

- title: **Approved Churches & Ministries**
- intro paragraph
- cards/list with fields:
  - organization name
  - leader/pastor name
  - city/state
  - short description
  - website link
- button: Apply for Approval

Churches and ministries should be clearly identified as approved listings, since ministry/church identity and membership structure matter for trust. [501c3](https://www.501c3.org/how-to-start-a-ministry/)

### `/kingdom-chamber/speakers`
Content to add:

- title: **Speaker Bureaus**
- intro paragraph
- profile cards with:
  - speaker name
  - photo
  - topics
  - short bio
  - books/media
  - booking link

### `/kingdom-chamber/gods-chosen`
Content to add:

- title: **Gods Chosen**
- intro paragraph:
  - invited or approved pastors, politicians, stars, public figures, and speakers
  - dues never exceeding $100/month
- profile card fields:
  - name
  - image
  - title/role
  - mission statement
  - official links
  - Kingdom Approved badge
  - dues text

## Bio / Books / Apply content

### `/bio`
Add:
- BJ name
- short bio
- vision statement
- mission
- optional image

### `/books`
Add:
- heading
- placeholder book cards:
  - book title
  - cover image placeholder
  - short description
  - buy button

### `/apply`
Add form:
- full name
- email
- phone
- organization name
- category:
  - church/ministry
  - speaker bureau
  - public figure
  - business
- short statement
- submit button

## Features to build

Exact feature list:

1. One new website/app from scratch.
2. Responsive layout.
3. Admin form to create message.
4. Message storage.
5. Unique route per message.
6. QR code generation. [nngroup](https://www.nngroup.com/articles/qr-code-guidelines/)
7. Unlock form with code entry.
8. Later: real TOTP/Google Authenticator-style flow. [firebase.google](https://firebase.google.com/docs/auth/web/totp-mfa)
9. Audio player on message page.
10. Ordered track dropdown.
11. Chamber landing page.
12. Churches page.
13. Speakers page.
14. Gods Chosen page.
15. Bio page.
16. Books page.
17. Apply page.

## Build order

Do it in this order today and next:

1. Create new app from scratch.
2. Make routes/pages.
3. Build homepage.
4. Build admin create-message page.
5. Build unlock page.
6. Build simple message view page.
7. Add QR generation.
8. Add track dropdown.
9. Add audio player.
10. Build Chamber pages.
11. Build bio/books/apply pages.
12. After that, replace fake code with real TOTP. [loginradius](https://www.loginradius.com/blog/engineering/what-is-totp-authentication)

So the answer is:

- **Yes, from scratch**
- **One website/app**
- **All features inside that one project**

If you want, I can next give you the exact **Next.js folder tree and page names** so you can start coding immediately.