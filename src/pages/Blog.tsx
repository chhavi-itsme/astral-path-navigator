
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FloatingStarsText from '@/components/FloatingStarsText';
import FloatingSaturn from '@/components/FloatingSaturn';
import AdSenseAd from '@/components/AdSenseAd';
import EnhancedImage from '@/components/EnhancedImage';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  imageAlt: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'what-is-saturn-return',
    title: 'What Is Saturn Return?',
    excerpt: 'Discover the fundamental concepts behind one of astrology\'s most significant life transits and how it shapes your personal growth.',
    content: `Saturn Return is one of the most significant astrological events in a person's life, occurring when the planet Saturn completes its orbit and returns to the exact same position it occupied at the time of your birth. This cosmic event happens approximately every 29.5 years, marking major life transitions and periods of profound personal growth.

**The Astronomical Reality**

Saturn takes about 29.5 Earth years to complete one full orbit around the Sun. When it returns to its natal position in your birth chart, it creates a powerful astrological influence that often coincides with major life changes. This isn't mere coincidence—Saturn's energy is associated with discipline, responsibility, limitations, and the structures that govern our lives.

**Key Characteristics of Saturn Return**

During a Saturn Return, you may experience:
- A strong urge to reassess your life direction
- Increased responsibility and accountability
- The end of relationships, jobs, or living situations that no longer serve you
- A desire to build more authentic and sustainable life structures
- Challenges that ultimately lead to greater maturity and wisdom

**The Three Saturn Returns**

Most people experience two to three Saturn Returns in their lifetime:
- **First Saturn Return (ages 27-30)**: Often called the "quarter-life crisis," this period typically involves career decisions, relationship commitments, and establishing adult independence.
- **Second Saturn Return (ages 57-60)**: A time of life review and wisdom-gathering, often coinciding with retirement planning and legacy considerations.
- **Third Saturn Return (ages 87-90)**: For those fortunate to experience it, this represents the completion of a full life cycle and the achievement of elder wisdom.

**Embracing the Challenge**

While Saturn Returns can feel challenging, they serve an important purpose in human development. They force us to confront areas of our lives that need restructuring and help us build more authentic, sustainable foundations for the future. Understanding when your Saturn Return is approaching can help you prepare for and embrace these transformative periods with greater awareness and intention.`,
    author: 'Cosmic Insights Team',
    date: '2025-05-15',
    readTime: '8 min read',
    category: 'Astrology Basics',
    image: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80',
    imageAlt: 'Starry night sky representing cosmic cycles and Saturn Return'
  },
  {
    id: 'how-to-use-calculator',
    title: 'How to Use the Saturn Return Calculator',
    excerpt: 'A comprehensive guide to getting the most accurate results from our Saturn Return calculator and understanding your personalized report.',
    content: `Our Saturn Return Calculator is designed to provide you with precise, personalized insights about your Saturn Return periods. Here's how to use it effectively to get the most accurate and helpful results.

**Step 1: Gather Your Birth Information**

For the most accurate calculation, you'll need:
- **Birth Date**: The exact day, month, and year you were born
- **Birth Time**: The precise time of birth (hour and minute). If you don't know your exact birth time, use 12:00 PM as an approximation, though this may affect accuracy
- **Birth Location**: The city and country where you were born
- **Current Location**: Where you currently live, which helps contextualize how Saturn's energy may manifest in your present environment

**Step 2: Enter Your Information**

Navigate to our calculator page and carefully enter all your birth details:
1. Select your birth date from the calendar
2. Use the time picker to set your birth time
3. Type your birth city and select it from the dropdown
4. Enter your current city for location-based insights

**Step 3: Review Your Results**

Once you submit your information, you'll receive:
- **Exact Saturn Return Dates**: Precise timing for when Saturn returns to your natal position
- **Duration Information**: How long each Saturn Return period will last
- **Personalized Insights**: Customized interpretations based on your unique chart
- **Life Phase Analysis**: Understanding of which life areas may be most affected

**Step 4: Understanding Your Report**

Your personalized report includes:
- **Past Saturn Returns**: If you've already experienced one, insights into what themes may have emerged
- **Current or Upcoming Returns**: Detailed information about your next Saturn Return
- **Preparation Guidance**: Suggestions for how to approach this transformative period

**Tips for Accuracy**

- If possible, obtain your exact birth time from your birth certificate or hospital records
- Double-check your birth location spelling and select the correct city from our database
- Remember that Saturn Return effects can be felt 1-2 years before and after the exact return date

**Making the Most of Your Results**

Use your Saturn Return calculation as a tool for:
- **Life Planning**: Understanding optimal timing for major decisions
- **Self-Reflection**: Gaining insight into recurring life themes
- **Personal Growth**: Preparing for periods of transformation and challenge
- **Relationship Timing**: Understanding how Saturn Returns may affect partnerships and commitments

**Frequently Asked Questions**

**Q: What if I don't know my exact birth time?**
A: While exact birth time provides the most accuracy, you can still get valuable insights with an approximate time or by using 12:00 PM.

**Q: How far in advance can I see my Saturn Return?**
A: Our calculator can predict Saturn Returns decades in advance, helping you plan for future life transitions.

**Q: Can I calculate Saturn Returns for family members?**
A: Yes! You can use the calculator for anyone whose birth information you have, making it a great tool for understanding family dynamics and timing.`,
    author: 'Cosmic Insights Team',
    date: '2025-05-20',
    readTime: '6 min read',
    category: 'How-To Guide',
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80',
    imageAlt: 'Computer screen showing code and calculations representing our Saturn Return Calculator'
  },
  {
    id: 'signs-of-saturn-return',
    title: 'How Do I Know If I Am Having My Saturn Return?',
    excerpt: 'Recognize the key signs and symptoms that indicate you\'re currently experiencing a Saturn Return period.',
    content: `Wondering if you're currently experiencing your Saturn Return? This transformative astrological transit doesn't just happen overnight—it builds gradually and can be felt for several years. Here are the key signs that indicate you may be in the midst of this important life phase.

**Timeline and Duration**

Saturn Returns don't happen in a single moment. The effects typically begin about 1-2 years before Saturn reaches its exact natal position and can continue for 1-2 years afterward. This means the entire experience can span 3-5 years, with the most intense period occurring when Saturn is within a few degrees of its natal position.

**Emotional and Psychological Signs**

**1. Intense Life Questioning**
You find yourself asking big questions: "Is this really what I want to be doing with my life?" "Am I on the right path?" "What do I actually want, versus what others expect of me?"

**2. Feeling Restless or Stuck**
There's a growing sense that your current situation isn't sustainable, even if you can't pinpoint exactly what needs to change.

**3. Increased Responsibility**
Life seems to be demanding more of you—whether through career advancement, family obligations, or personal challenges that require greater maturity.

**4. Desire for Authenticity**
You feel compelled to align your external life with your internal values, even if it means making difficult changes.

**Practical Life Changes**

**Major Life Transitions**
Common Saturn Return experiences include:
- Career changes or increased professional responsibility
- Relationship endings or commitments (marriage, divorce, serious partnerships)
- Geographic moves or changes in living situation
- Educational pursuits or skill development
- Health wake-up calls that prompt lifestyle changes

**Structural Challenges**
- Financial pressures that force budget reassessment
- Relationship dynamics that no longer work
- Living situations that feel outgrown
- Career paths that feel misaligned

**Age-Related Timing**

**First Saturn Return (Ages 27-30)**
- Quarter-life crisis feelings
- Pressure to "settle down" or make adult commitments
- Career establishment anxiety
- Relationship definition needs
- Financial independence pressure

**Second Saturn Return (Ages 57-60)**
- Midlife perspective shifts
- Career legacy considerations
- Relationship re-evaluation after decades together
- Health and mortality awareness
- Wisdom-sharing impulses

**Relationship Patterns**

During Saturn Return, relationships often undergo significant changes:
- Partnerships that lack solid foundations may end
- Commitment-ready relationships may deepen into marriage
- Family dynamics may shift as you establish adult boundaries
- Friendships may be re-evaluated based on authenticity and mutual growth

**Professional Shifts**

Career-related Saturn Return signs include:
- Feeling unfulfilled in your current role
- Sudden opportunities for advancement or leadership
- Industry changes that force skill development
- Entrepreneurial urges or career pivots
- Increased professional responsibility

**How to Confirm You're in Saturn Return**

The most definitive way to know if you're experiencing Saturn Return is to use an astrological calculator (like ours!) to determine the exact timing based on your birth information. However, if you're experiencing multiple signs listed above and you're in the right age range, you're likely in this transformative period.

**Navigating Saturn Return Awareness**

Once you recognize you're in Saturn Return:
1. **Embrace the Process**: Understand that challenges are part of necessary growth
2. **Reflect Deeply**: Use this time for honest self-assessment
3. **Make Conscious Choices**: Align decisions with your authentic values
4. **Seek Support**: Consider therapy, coaching, or spiritual guidance
5. **Be Patient**: Remember that this is a multi-year process, not a quick fix

**The Silver Lining**

While Saturn Return can feel overwhelming, remember that it's ultimately about building a more authentic and sustainable life structure. The challenges you face now are preparing you for greater success and fulfillment in the years to come.`,
    author: 'Cosmic Insights Team',
    date: '2025-05-25',
    readTime: '7 min read',
    category: 'Signs & Symptoms',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80',
    imageAlt: 'Mountain summit in fog representing life transitions and Saturn Return challenges'
  },
  {
    id: 'meaning-of-saturn-return',
    title: 'What Does It Mean If I\'m Having My Saturn Return?',
    excerpt: 'Understand the deeper significance of your Saturn Return and how to harness its transformative power for personal growth.',
    content: `If you're currently experiencing your Saturn Return, you're in the midst of one of life's most important astrological transits. Understanding what this means can help you navigate this period with greater wisdom and purpose, transforming potential challenges into opportunities for profound personal growth.

**The Deeper Meaning of Saturn Return**

Saturn Return represents a cosmic "graduation" or "initiation" into a new phase of life. Saturn, known as the "taskmaster" of astrology, is asking you to demonstrate what you've learned in the previous 29.5 years and to step into greater responsibility and authenticity.

**Core Themes and Lessons**

**1. Authenticity Over Approval**
Saturn Return often reveals where you've been living to please others rather than honoring your true self. It asks you to choose authenticity over approval, even when this choice feels scary or uncertain.

**2. Structure and Foundation Building**
This period is about creating sustainable life structures—whether in career, relationships, health, or personal values. Saturn demands that you build on solid foundations rather than temporary fixes.

**3. Accountability and Maturity**
You're being called to take full responsibility for your life choices and their consequences. This isn't about blame or shame—it's about empowerment and adult ownership of your path.

**4. Quality Over Quantity**
Saturn Return often involves pruning what no longer serves you. This might mean ending relationships, changing careers, or abandoning goals that were never truly yours to begin with.

**What's Happening Energetically**

**Karmic Completion**
From an astrological perspective, Saturn Return represents the completion of important karmic lessons. You're finishing chapters that began nearly three decades ago and preparing to write new ones.

**Initiation into Wisdom**
This period marks your initiation into a new level of life wisdom. The challenges you face aren't punishments—they're teaching opportunities designed to help you grow into your next level of being.

**Soul Alignment**
Saturn Return creates pressure that forces alignment between your soul's purpose and your external life. This pressure may feel uncomfortable, but it's ultimately redirecting you toward your authentic path.

**Different Meanings by Life Stage**

**First Saturn Return (Late 20s/Early 30s)**
Meaning: "Who am I as an adult, and what do I want to build?"
- Establishing adult identity beyond family expectations
- Making long-term commitments in career and relationships
- Learning to balance freedom with responsibility
- Developing financial independence and life skills

**Second Saturn Return (Late 50s/Early 60s)**
Meaning: "What wisdom have I gained, and how will I share it?"
- Evaluating life accomplishments and legacy
- Transitioning from building to mentoring
- Deepening spiritual understanding
- Preparing for life's next chapter with wisdom

**Common Manifestations and Their Meanings**

**Career Upheaval**
If you're experiencing career challenges, Saturn is asking: "Is this work aligned with your authentic purpose and values?" Changes may feel disruptive but often lead to more fulfilling professional paths.

**Relationship Endings or Deepening**
Relationship changes during Saturn Return aren't random. They reflect whether your connections are built on authentic foundations or convenient circumstances.

**Financial Pressure**
Money challenges often force you to evaluate your values, priorities, and relationship with security. Saturn teaches sustainable abundance rather than quick fixes.

**Health Wake-Up Calls**
Physical challenges may emerge to remind you that your body is the foundation for everything else. Saturn encourages sustainable health practices over quick fixes.

**How to Work WITH Saturn Return Energy**

**1. Embrace the Pressure**
Instead of resisting challenges, ask: "What is this experience trying to teach me?" Use pressure as information about what needs to change.

**2. Make Conscious Choices**
Saturn Return gives you the opportunity to consciously choose your path rather than drifting unconsciously. Use this time to make deliberate decisions aligned with your values.

**3. Invest in Long-Term Growth**
Focus on building skills, relationships, and structures that will serve you for decades to come, rather than seeking immediate gratification.

**4. Seek Wisdom and Guidance**
This is an ideal time to work with mentors, therapists, coaches, or spiritual advisors who can help you navigate transformation consciously.

**5. Trust the Process**
Remember that Saturn Return discomfort is temporary but its benefits are lasting. Trust that current challenges are preparing you for future success and fulfillment.

**The Transformative Promise**

If you're experiencing Saturn Return, you're being invited into a more authentic, responsible, and empowered version of yourself. While the process may feel challenging, it's ultimately about aligning your external life with your inner truth and building foundations that will support your highest potential.

This isn't just an astrological phase—it's a profound opportunity for conscious evolution. By understanding and working with Saturn Return energy, you can emerge from this period stronger, wiser, and more aligned with your true purpose than ever before.

**Moving Forward with Purpose**

As you navigate your Saturn Return, remember that you're not just surviving a difficult period—you're actively participating in your own transformation. The person you're becoming through this process is exactly who you need to be for your next life chapter.`,
    author: 'Cosmic Insights Team',
    date: '2025-05-30',
    readTime: '9 min read',
    category: 'Deep Dive',
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&q=80',
    imageAlt: 'Golden lights between trees representing transformation and spiritual growth during Saturn Return'
  }
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="min-h-screen py-12 relative overflow-hidden">
        <FloatingSaturn 
          size="sm" 
          position="top-16 left-8" 
          delay={0} 
          rotation={-20} 
          variant="purple" 
        />
        <FloatingSaturn 
          size="md" 
          position="bottom-32 right-12" 
          delay={1.5} 
          rotation={15} 
          variant="golden" 
        />

        <div className="cosmic-container relative z-10">
          <button 
            onClick={() => setSelectedPost(null)}
            className="mb-8 flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            ← Back to Blog
          </button>

          <article className="max-w-4xl mx-auto">
            <header className="mb-12">
              <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {selectedPost.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(selectedPost.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {selectedPost.readTime}
                </div>
              </div>
              
              <FloatingStarsText starCount={6}>
                <h1 className="text-4xl md:text-5xl cosmic-title mb-6">{selectedPost.title}</h1>
              </FloatingStarsText>
              
              <div className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium mb-6">
                {selectedPost.category}
              </div>

              <div className="mb-8 rounded-lg overflow-hidden">
                <EnhancedImage
                  src={selectedPost.image}
                  alt={selectedPost.imageAlt}
                  className="w-full h-64 md:h-80 object-cover"
                  priority={true}
                  width={800}
                  height={400}
                />
              </div>
            </header>

            {/* AdSense Ad - Article Top */}
            <div className="mb-8">
              <AdSenseAd 
                slot="1234567890" 
                format="rectangle" 
                className="max-w-md mx-auto"
              />
            </div>

            <div className="cosmic-card p-8 md:p-12">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {selectedPost.content.split('\n\n').map((paragraph, index) => {
                  // Add ad after 3rd paragraph for longer articles
                  if (index === 3 && selectedPost.content.split('\n\n').length > 6) {
                    return (
                      <React.Fragment key={index}>
                        {paragraph.startsWith('**') && paragraph.endsWith('**') ? (
                          <h3 className="text-xl font-semibold text-foreground mt-8 mb-4 sparkling-text">
                            {paragraph.replace(/\*\*/g, '')}
                          </h3>
                        ) : paragraph.startsWith('- ') ? (
                          <ul className="list-disc list-inside space-y-2 my-6">
                            {paragraph.split('\n').filter(item => item.startsWith('- ')).map((item, itemIndex) => (
                              <li key={itemIndex}>{item.substring(2)}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="mb-6 leading-relaxed">{paragraph}</p>
                        )}
                        
                        {/* Mid-article ad */}
                        <div className="my-6">
                          <AdSenseAd 
                            slot="0987654321" 
                            format="horizontal" 
                            className="max-w-lg mx-auto"
                          />
                        </div>
                      </React.Fragment>
                    );
                  }

                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold text-foreground mt-8 mb-4 sparkling-text">
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').filter(item => item.startsWith('- '));
                    return (
                      <ul key={index} className="list-disc list-inside space-y-2 my-6">
                        {items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item.substring(2)}</li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={index} className="mb-6 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* AdSense Ad - Article Bottom */}
            <div className="mt-8">
              <AdSenseAd 
                slot="1357924680" 
                format="rectangle" 
                className="max-w-md mx-auto"
              />
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      {/* Floating Saturn globes */}
      <FloatingSaturn 
        size="sm" 
        position="top-16 left-8" 
        delay={0} 
        rotation={-20} 
        variant="purple" 
      />
      <FloatingSaturn 
        size="md" 
        position="top-32 right-12" 
        delay={1.5} 
        rotation={15} 
        variant="golden" 
      />
      <FloatingSaturn 
        size="sm" 
        position="bottom-40 left-16" 
        delay={2.5} 
        rotation={-10} 
        variant="fiery" 
      />

      <div className="cosmic-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FloatingStarsText starCount={8} starColor="rgba(135, 206, 250, 0.8)">
            <h1 className="text-4xl md:text-5xl cosmic-title mb-6">Saturn Return Blog</h1>
          </FloatingStarsText>
          <p className="text-lg text-muted-foreground">
            Explore insights, guidance, and wisdom about Saturn Return and its transformative power in your life.
          </p>
        </div>

        {/* AdSense Ad - Blog Top */}
        <div className="mb-12">
          <AdSenseAd 
            slot="2468135790" 
            format="horizontal" 
            className="max-w-2xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <React.Fragment key={post.id}>
              <article className="cosmic-card overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer" onClick={() => setSelectedPost(post)}>
                <div className="h-48 overflow-hidden">
                  <EnhancedImage
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    width={400}
                    height={200}
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <div className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {post.category}
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-3 sparkling-text group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                    Read More <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </article>

              {/* Add ad after every 2 blog posts */}
              {(index + 1) % 2 === 0 && index < blogPosts.length - 1 && (
                <div className="md:col-span-2 my-4">
                  <AdSenseAd 
                    slot="1122334455" 
                    format="horizontal" 
                    className="max-w-xl mx-auto"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* AdSense Ad - Blog Bottom */}
        <div className="mt-12">
          <AdSenseAd 
            slot="5566778899" 
            format="rectangle" 
            className="max-w-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
