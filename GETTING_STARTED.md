# Getting started

A step-by-step guide to get this website running on your computer. No coding needed. Allow about 30 to 45 minutes the first time.

You will:

1. Install three free tools
2. Download the project
3. Create a database (Neon)
4. Get an email key (Resend)
5. Get spam protection keys (Google reCAPTCHA)
6. Put those values into one settings file
7. Start the website and log in

> **Using an AI agent (Claude Code)?** After Part 2 you can open the project folder in the agent and type **get started**. It walks you through the rest and asks for what it needs. You still collect the keys from Parts 3 to 5 yourself.

Throughout this guide, a grey box like the one below is a command. Copy it, paste it into the Terminal, and press Enter.

```bash
echo "this is a command"
```

**Opening the Terminal:** on Mac, press `Cmd + Space`, type `Terminal`, press Enter. On Windows, open the Start menu, type `PowerShell`, press Enter.

---

## Part 1: Install the tools

You need these once per computer.

### First, check what you already have

Run these three commands:

```bash
node --version
bun --version
git --version
```

- A line that prints a version number (for example `v22.11.0`) means that tool **is already installed. Skip its step below.**
- A line that says `command not found` (Mac) or `is not recognized` (Windows) means that tool is missing. Install it below.

If all three print a version number, skip the rest of Part 1 and go to [Part 2](#part-2-download-the-project).

| Tool | Minimum version | If yours is older |
| --- | --- | --- |
| Node.js | `v20.9` | Install the current LTS version (step 1) |
| Bun | `1.2` | Run `bun upgrade` |
| Git | any | Nothing to do |

### 1. Node.js

**Skip if `node --version` printed `v20.9` or higher.**

Go to [nodejs.org](https://nodejs.org), download the version marked **LTS**, and run the installer with the default options.

### 2. Bun

**Skip if `bun --version` printed `1.2` or higher.**

Bun installs and runs the project.

Mac or Linux:

```bash
curl -fsSL https://bun.sh/install | bash
```

Windows (PowerShell):

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

Close the Terminal and open it again afterwards.

### 3. Git

**Skip if `git --version` printed a version number.**

Git downloads the project. Go to [git-scm.com/downloads](https://git-scm.com/downloads) and install it with the default options. On Mac, running `git --version` in the Terminal offers to install it for you.

### Check again

If you installed anything, close the Terminal, open it again, and run the three commands from the top of this part once more. Each line should now print a version number. If one still fails, reinstall that tool.

---

## Part 2: Download the project

1. Choose where the project should live, for example your Documents folder:

   ```bash
   cd ~/Documents
   ```

2. Download it. Replace `my-website` with the folder name you want:

   ```bash
   git clone https://github.com/rashedxali/payload-boilerplate.git my-website
   ```

   **Skip if you already have the project folder** on your computer; just go into it in the next step.

3. Go into the folder:

   ```bash
   cd my-website
   ```

4. Install the project's packages. This takes a minute or two:

   ```bash
   bun install
   ```

Keep this Terminal window open. Every later command is run from inside this folder.

---

## Part 3: Create the database (Neon)

The database stores your pages, blog posts, images and form submissions.

**Skip if you already have a new, empty Postgres connection string for this website.** Go straight to Part 4.

1. Go to [neon.com](https://neon.com) and sign up. The free plan is enough to start.
2. Create a **new project**. Give it a name and pick the region closest to your visitors. Leave the other options as they are.
3. On the project dashboard, click **Connect**.
4. Copy the **connection string**. It starts with `postgresql://` and looks like this:

   ```
   postgresql://user:password@ep-something.region.aws.neon.tech/neondb?sslmode=require
   ```

5. Paste it into a note for now. You need it in Part 6 as `DATABASE_URL`.

> Treat this string like a password. Anyone who has it can read and change your database.
>
> Use a **new, empty** database for each website. Do not reuse one from another project.

---

## Part 4: Get the email key (Resend)

Resend sends the emails for your contact forms. **This part is optional.** Without it, form submissions are still saved and visible in the admin panel; no email is sent.

1. Go to [resend.com](https://resend.com) and sign up.
2. Open **Domains**, click **Add Domain**, and enter your website's domain, for example `yourcompany.com`.
3. Resend shows a list of DNS records. Add them where your domain is managed (GoDaddy, Namecheap, Cloudflare, and so on), then click **Verify** in Resend. This can take from a few minutes to a few hours. If you do not manage the domain yourself, send the list to whoever does.
4. Open **API Keys**, click **Create API Key**, name it, and create it.
5. Copy the key now. It starts with `re_` and is shown **only once**.

Save three things for Part 6:

| What | Example | Used as |
| --- | --- | --- |
| The API key | `re_AbC123...` | `RESEND_API_KEY` |
| The address emails are sent from, on your verified domain | `hello@yourcompany.com` | `EMAIL_FROM_ADDRESS` |
| The sender name people see | `Your Company` | `EMAIL_FROM_NAME` |

> Emails are only sent when both the API key and the from address are set. The from address must use the domain you verified, otherwise Resend rejects the email.

---

## Part 5: Get the spam protection keys (Google reCAPTCHA)

reCAPTCHA stops bots from submitting your forms. **This part is optional.** Without it, forms work normally, with no bot protection.

1. Go to [google.com/recaptcha/admin/create](https://www.google.com/recaptcha/admin/create) and sign in with a Google account.
2. Fill in the form:
   - **Label:** your website name.
   - **reCAPTCHA type:** choose **Challenge (v2)**, then **Invisible reCAPTCHA badge**. This exact type is required; the other types do not work with this site.
   - **Domains:** add `localhost` (so it works on your computer) and your real domain, for example `yourcompany.com`.
3. Submit the form.
4. Google shows two keys. Copy both:

| What | Used as |
| --- | --- |
| **Site key** | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` |
| **Secret key** | `RECAPTCHA_SECRET_KEY` |

> Both keys are needed. With only one, reCAPTCHA stays off.

---

## Part 6: Add your values to the settings file

The project reads its private settings from a file named `.env`.

1. Create it from the example. **Skip this step if a `.env` file already exists** (copying again would erase the values in it). In the Terminal, inside the project folder:

   Mac or Linux:

   ```bash
   cp .env.example .env
   ```

   Windows (PowerShell):

   ```powershell
   Copy-Item .env.example .env
   ```

2. Open the file in a text editor.

   Mac:

   ```bash
   open -e .env
   ```

   Windows:

   ```powershell
   notepad .env
   ```

   Files that start with a dot are hidden in Finder and File Explorer, which is why you open it from the Terminal.

3. Fill in the values. Put each value right after the `=` sign, with **no spaces** and **no quotes**.

   **Required**

   | Line in the file | What to put |
   | --- | --- |
   | `DATABASE_URL=` | The Neon connection string from Part 3 |
   | `PAYLOAD_SECRET=` | A long random text. See below |
   | `NEXT_PUBLIC_SERVER_URL=` | `http://localhost:3000` while working on your computer |
   | `CRON_SECRET=` | Another random text |
   | `PREVIEW_SECRET=` | Another random text |
   | `ADMIN_DEFAULT_USER_EMAIL=` | The email you will log in with |
   | `ADMIN_DEFAULT_USER_PASSWORD=` | The password you will log in with. Make it strong |

   **Optional** (leave empty to switch the feature off)

   | Line in the file | What to put |
   | --- | --- |
   | `RESEND_API_KEY=` | The Resend key from Part 4 |
   | `EMAIL_FROM_ADDRESS=` | Your from address from Part 4 |
   | `EMAIL_FROM_NAME=` | Your sender name from Part 4 |
   | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY=` | The site key from Part 5 |
   | `RECAPTCHA_SECRET_KEY=` | The secret key from Part 5 |

   **Making a random text:** run this command three times, and use one result each for `PAYLOAD_SECRET`, `CRON_SECRET` and `PREVIEW_SECRET`:

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. Save the file and close the editor.

A finished file looks like this (with your own values):

```
DATABASE_URL=postgresql://user:password@ep-something.region.aws.neon.tech/neondb?sslmode=require
PAYLOAD_SECRET=4f8c1e...
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
CRON_SECRET=9a2b7d...
PREVIEW_SECRET=c31e05...
ADMIN_DEFAULT_USER_EMAIL=you@yourcompany.com
ADMIN_DEFAULT_USER_PASSWORD=a-strong-password
RESEND_API_KEY=re_AbC123...
EMAIL_FROM_ADDRESS=hello@yourcompany.com
EMAIL_FROM_NAME=Your Company
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lc...
RECAPTCHA_SECRET_KEY=6Lc...
```

> Never share the `.env` file, post it in a chat, or upload it anywhere. It is already excluded from Git, so it is not uploaded with the code.

**Prefer not to put the email and reCAPTCHA keys in the file?** You can leave those five optional lines empty and enter the same values later in the admin panel, under **Settings → Integrations**. Values entered there take priority over the file.

---

## Part 7: Start the website

1. Prepare the database. This creates the tables the website needs:

   ```bash
   bun run payload migrate
   ```

   Wait until it finishes.

2. Create your admin login:

   ```bash
   bun run seed
   ```

   You should see `Admin user ... created.`

3. Start the website:

   ```bash
   bun run dev
   ```

   Wait for the line that says `Ready`. Leave this Terminal window open; closing it stops the website.

4. Open your browser:

   - Your website: [http://localhost:3000](http://localhost:3000)
   - Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

5. Log in to the admin panel with the email and password you put in `ADMIN_DEFAULT_USER_EMAIL` and `ADMIN_DEFAULT_USER_PASSWORD`.

**To stop the website:** click the Terminal window and press `Ctrl + C`.

**To start it again later:** open the Terminal, then:

```bash
cd ~/Documents/my-website
bun run dev
```

---

## Part 8: First steps in the admin panel

1. **Settings → General:** enter your site name, upload your logo and favicon, and add contact details.
2. **Settings → SEO:** set the title suffix (for example `| Your Company`) and a default description.
3. **Settings → Integrations:** check or enter your Resend and reCAPTCHA values.
4. **Pages:** create a page and give it the slug `home`. That page becomes your homepage.
5. **Header** and **Footer:** add your navigation links.
6. **Forms:** create a contact form, then add a **Contact Us Section** block to a page and select that form.

To test the form, submit it on your website, then look under **Form Submissions** in the admin panel. If Resend is set up and the form has an email configured, the email arrives as well.

---

## Your brand

The colors, fonts and tone of the website are described in the [`brand/`](brand/) folder. Before asking a developer or an AI agent to build new sections, fill in [`brand/about.md`](brand/about.md) with your company details, and replace the colors and fonts in [`brand/colors.md`](brand/colors.md) and [`brand/fonts.md`](brand/fonts.md) with your own. Plain text is fine.

---

## If something goes wrong

| What you see | What to do |
| --- | --- |
| `command not found: bun` (or `node`, `git`) | Close and reopen the Terminal. If it still fails, reinstall that tool (Part 1). |
| An error mentioning `DATABASE_URL`, `ECONNREFUSED` or `password authentication failed` | The database address is wrong. Copy the connection string from Neon again and paste it into `.env` with no spaces or quotes. |
| `ADMIN_DEFAULT_USER_EMAIL and ADMIN_DEFAULT_USER_PASSWORD must both be set` | Fill in both lines in `.env`, save, and run `bun run seed` again. |
| `Admin user ... already exists; skipping.` | Not an error. The login was created earlier; use it. |
| An error about a missing table or relation when seeding | Run `bun run payload migrate` first, then `bun run seed`. |
| `Port 3000 is in use` | The website is already running in another Terminal window. Use that one, or stop it there with `Ctrl + C`. |
| The page does not load | Check the Terminal still shows the website running, and that the address is `http://localhost:3000`. |
| Forms submit but no email arrives | Check the API key **and** the from address are both set, the domain is verified in Resend, and the form in the admin panel has an email configured. The submission is still saved under **Form Submissions**. |
| `reCAPTCHA verification failed` when submitting a form | Check both keys are correct, the type is **v2 Invisible**, and `localhost` (or your domain) is in the reCAPTCHA domain list. |
| You changed `.env` and nothing changed | Stop the website with `Ctrl + C` and start it again with `bun run dev`. |

Still stuck? Copy the full error text from the Terminal and send it to your developer, or paste it to the AI agent. Do not include the contents of your `.env` file.

---

## Words used in this guide

| Word | Meaning |
| --- | --- |
| Terminal | The app where you type commands |
| Command | A line of text you paste into the Terminal and run with Enter |
| `.env` file | A private file holding your keys and passwords for this project |
| Database | Where the website's content is stored |
| API key | A password that lets this website use another service |
| Admin panel | The private area where you edit the website's content |
| `localhost` | Your own computer. `http://localhost:3000` only works on your machine |
| Slug | The last part of a page's address, for example `about-us` |
