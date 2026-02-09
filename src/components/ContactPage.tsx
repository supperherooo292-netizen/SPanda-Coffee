import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function ContactPage() {

  return (
    <div className="min-h-screen py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 font-serif">Contact person</h1>
          <p className="text-muted-foreground text-lg">Hubungi kami untuk informasi lebih detail</p>
        </div>

        <div className="grid md:grid-cols-1 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Alamat</h3>
                    <p className="text-muted-foreground">
                      Jl. Ki Mangun Sarkoro No.VI/3, Dusun Talun, Beji, Kec. Boyolangu, Kabupaten Tulungagung, Jawa Timur 66233
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Telepon</h3>
                    <p className="text-muted-foreground">
                      Utama: (555) 123-4567<br />
                      Seluler: (555) 987-6543
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Email</h3>
                    <p className="text-muted-foreground">
                      Umum: SPandacoffee@Gmail.com<br />
                      Dukungan: support@Spandacoffee.com
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl mb-2">Jam Operasional</h3>
                    <p className="text-muted-foreground">
                      Senin - Jumat: 7:00 AM - 8:00 PM<br />
                      Sabtu - Minggu: 8:00 AM - 9:00 PM<br />
                      Hari Libur Nasional: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12">
          <iframe
            title="Lokasi Warung Kopi Nyaman"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2632.491226206371!2d111.89845743538439!3d-8.081359254459295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78e2fe4e42ef85%3A0x873776b0da703415!2sSMKN%201%20Boyolangu%20Tulungagung!5e1!3m2!1sid!2sid!4v1770132140084!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
