'use client'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Instagram', url: '#' },
    { name: 'Pinterest', url: '#' },
    { name: 'Facebook', url: '#' },
  ]

  const footerLinks = {
    Shop: ['Collections', 'Custom Orders', 'Gift Cards', 'Wedding Flowers'],
    About: ['Our Story', 'The Studio', 'Sustainability', 'Blog'],
    Support: ['Contact Us', 'FAQs', 'Shipping', 'Returns'],
  }

  return (
    <footer className="bg-stone-100 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-3xl text-stone-900 mb-4">Violet Hues</h3>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Independent florist creating handcrafted arrangements with locally-sourced blooms.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="text-stone-600 hover:text-stone-900 transition-colors text-sm"
                  aria-label={social.name}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-stone-900 mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-stone-600 hover:text-stone-900 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-500 text-sm">
              © {currentYear} Violet Hues. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-stone-500">
              <a href="#" className="hover:text-stone-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-stone-900 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-stone-900 transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
