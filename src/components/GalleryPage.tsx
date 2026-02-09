import React from 'react';

export function GalleryPage() {
  const images = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1743689374053-be49ca407b7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBoZXJvJTIwd2FybXxlbnwxfHx8fDE3Njk3NjAyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Coffee Cup',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1667388363683-a07bbf0c84b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwbGF0dGUlMjBhcnR8ZW58MXx8fHwxNzY5NjkxNTY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Cappuccino Latte Art',
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1528401635478-821b5f89ff94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGRyaW5rJTIwY29mZmVlfGVufDF8fHx8MTc2OTc2MDI5Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Espresso',
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1593536488177-1eb3c2d4e3d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwaW50ZXJpb3IlMjBjb3p5fGVufDF8fHx8MTc2OTc2MDI5NHww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Café Interior',
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1618108487640-249b7e29d73e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3IlMjB3b29kZW58ZW58MXx8fHwxNzY5NzYwMjk2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Coffee Shop Interior',
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1672570050756-4f1953bde478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBiZWFucyUyMHJvYXN0ZWR8ZW58MXx8fHwxNzY5NzIwNDYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Coffee Beans',
    },
    {
      id: '7',
      url: 'https://images.unsplash.com/photo-1684439670717-b1147a7e7534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwYmV2ZXJhZ2V8ZW58MXx8fHwxNzY5NzYwMjkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Iced Coffee',
    },
    {
      id: '8',
      url: 'https://images.unsplash.com/photo-1708572727896-117b5ea25a86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGdyZWVufGVufDF8fHx8MTc2OTc1Mzk3NXww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Matcha Latte',
    },
    {
      id: '9',
      url: 'https://images.unsplash.com/photo-1751151856149-5ebf1d21586a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnklMjBiYWtlcnl8ZW58MXx8fHwxNzY5NzE1OTYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Croissant',
    },
    {
      id: '10',
      url: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwZGVzc2VydHxlbnwxfHx8fDE3Njk2NzkwOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Chocolate Cake',
    },
    {
      id: '11',
      url: 'https://images.unsplash.com/photo-1539021897569-06e9fa3c6bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJpc3RhJTIwbWFraW5nJTIwY29mZmVlfGVufDF8fHx8MTc2OTcwMTU4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Barista Making Coffee',
    },
    {
      id: '12',
      url: 'https://images.unsplash.com/photo-1655655555559-70610bfe5598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwbGF0dGUlMjBhcnQlMjBiYXJpc3RhfGVufDF8fHx8MTc2OTc2MDI5NXww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Latte Art',
    },
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 font-serif">Galery</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
