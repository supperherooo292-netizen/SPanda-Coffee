import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Coffee, Droplet, Cookie, Cake } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner@2.0.3';

export function MenuPage() {
  const { menuItems, addToCart } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('coffee');

  const categories = [
    { id: 'coffee', label: 'Kopi', icon: Coffee },
    { id: 'non-coffee', label: 'Non-Kopi', icon: Droplet },
    { id: 'snacks', label: 'Camilan', icon: Cookie },
    { id: 'desserts', label: 'Dessert', icon: Cake },
  ];

  const filteredItems = menuItems.filter(item => item.category === activeCategory && item.available);

  

  return (
    <div className="min-h-screen py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 font-serif">Menu</h1>
          <p className="text-muted-foreground text-lg">Nikmati pilihan specialty coffee, minuman racikan khas, dan hidangan pendamping <br />
           yang dirancang untuk menghadirkan pengalaman ngopi yang berkesan di setiap kunjungan.</p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12 bg-muted h-auto p-2 rounded-full">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 py-3"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all border-border bg-card group">
                    <div className="h-64 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl">{item.name}</h3>
                        <span className="text-2xl text-primary">Rp {item.price.toLocaleString('id-ID')}</span>
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredItems.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">Tidak ada item yang tersedia dalam kategori ini</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
