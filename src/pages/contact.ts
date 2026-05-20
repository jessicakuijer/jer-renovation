import '../app'

import { getContactRecipient } from '../lib/contact-email'

function encodeMailtoParam(value: string): string {
  return encodeURIComponent(value).replace(/%20/g, '+')
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-quick-form') as HTMLFormElement | null
  if (!form) return

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    const honeypot = form.querySelector<HTMLInputElement>('[name="website"]')
    if (honeypot?.value) return

    const name = (form.querySelector<HTMLInputElement>('[name="name"]')?.value ?? '').trim()
    const replyEmail = (form.querySelector<HTMLInputElement>('[name="email"]')?.value ?? '').trim()
    const message = (form.querySelector<HTMLTextAreaElement>('[name="message"]')?.value ?? '').trim()

    if (!name || !replyEmail || !message) return

    const subject = `Demande de contact — ${name}`
    const body = [
      'Message envoyé depuis jer-renovation.fr',
      '',
      `Nom : ${name}`,
      `E-mail pour répondre : ${replyEmail}`,
      '',
      '---',
      '',
      message,
    ].join('\n')

    const mailto = `mailto:${getContactRecipient()}?subject=${encodeMailtoParam(subject)}&body=${encodeMailtoParam(body)}`
    window.location.href = mailto
  })
})
