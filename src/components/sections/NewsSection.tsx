import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
}

export default function NewsSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data.slice(0, 3))) // Show only latest 3
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-10 bg-[#071525]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#4fc3d0]" />
              <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-[#4fc3d0]">Latest Intelligence</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-medium tracking-tight text-white leading-[0.9]">
              Strategic <br /> Updates
            </h2>
          </div>
          <p className="text-white/50 max-w-sm text-base md:text-lg leading-relaxed">
            Stay informed with our latest research, breakthroughs, and strategic milestones in the mental health frontier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 hover:bg-white/10 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 bg-[#4fc3d0]/10 text-[#4fc3d0] text-[9px] md:text-[10px] font-mono uppercase tracking-widest rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-white/30 text-[9px] md:text-[10px] font-mono">
                  <Calendar size={12} />
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-medium text-white mb-4 group-hover:text-[#4fc3d0] transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-white/40 text-xs md:text-sm leading-relaxed mb-8 line-clamp-3">
                {post.content}
              </p>

              <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-white/60 group-hover:text-white transition-colors">Read More</span>
                <ArrowRight size={16} className="text-[#4fc3d0] transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
