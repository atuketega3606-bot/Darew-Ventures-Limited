import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setSuccess(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
    
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="pt-20">
       {/* Header */}
       <section className="bg-white dark:bg-darew-lightBlue py-20 border-b border-gray-200 dark:border-white/5 transition-colors">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-darew-white mb-4">Contact Us</h1>
          <p className="text-gray-600 dark:text-darew-gray max-w-2xl mx-auto">
            Get in touch with our expert team for inquiries, partnerships, or support.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-darew-blue transition-colors">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact Info */}
            <div className="lg:w-1/3 space-y-8">
              <div className="bg-white dark:bg-darew-lightBlue p-8 rounded border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none transition-colors">
                <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-darew-white mb-6">Headquarters</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 dark:bg-darew-blue p-3 rounded text-darew-gold">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-darew-white font-semibold">Address</p>
                      <p className="text-gray-600 dark:text-darew-gray text-sm mt-1">124 Energy Boulevard, Victoria Island, Lagos, Nigeria.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 dark:bg-darew-blue p-3 rounded text-darew-gold">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-darew-white font-semibold">Phone</p>
                      <p className="text-gray-600 dark:text-darew-gray text-sm mt-1">+234 1 234 5678</p>
                      <p className="text-gray-600 dark:text-darew-gray text-sm">+234 800 HELP OIL</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 dark:bg-darew-blue p-3 rounded text-darew-gold">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-darew-white font-semibold">Email</p>
                      <p className="text-gray-600 dark:text-darew-gray text-sm mt-1">info@darewventure.com</p>
                      <p className="text-gray-600 dark:text-darew-gray text-sm">support@darewventure.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 dark:bg-darew-blue p-3 rounded text-darew-gold">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-darew-white font-semibold">WhatsApp</p>
                      <p className="text-gray-600 dark:text-darew-gray text-sm mt-1">+234 812 345 6789</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded relative overflow-hidden group">
                 <img src="https://picsum.photos/id/10/800/600" alt="Map Location" className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-darew-gold text-darew-blue px-4 py-2 text-sm font-bold rounded">View on Google Maps</button>
                 </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:w-2/3 bg-white dark:bg-darew-lightBlue p-10 rounded border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none transition-colors">
              <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-darew-white mb-2">Send us a Message</h3>
              <p className="text-gray-600 dark:text-darew-gray mb-8 text-sm">Fill out the form below and we will respond within 24 hours.</p>
              
              {success && (
                <div className="bg-green-100 dark:bg-green-500/20 border border-green-500 text-green-700 dark:text-green-400 p-4 rounded mb-6">
                  Message sent successfully! We will be in touch soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-darew-gray uppercase mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 dark:bg-darew-blue border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-darew-white p-4 rounded focus:outline-none focus:border-darew-gold transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-darew-gray uppercase mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-darew-blue border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-darew-white p-4 rounded focus:outline-none focus:border-darew-gold transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-darew-gray uppercase mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 dark:bg-darew-blue border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-darew-white p-4 rounded focus:outline-none focus:border-darew-gold transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 dark:text-darew-gray uppercase mb-2">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-gray-50 dark:bg-darew-blue border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-darew-white p-4 rounded focus:outline-none focus:border-darew-gold transition-colors resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="bg-darew-gold text-darew-blue px-8 py-4 font-bold text-sm tracking-wide hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-darew-blue transition-colors duration-300 w-full md:w-auto flex items-center justify-center gap-2"
                >
                  SEND MESSAGE <Send className="h-4 w-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;