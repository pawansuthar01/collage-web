import { motion } from "framer-motion";
import About from "../components/About";
import Layout from "../layout/layout";
import image from "../../public/assets/download (2).jpeg";
import image_1 from "../../public/assets/image_2.jpeg";
import image_2 from "../../public/assets/Screenshot 2025-05-01 155221.png";
import image_3 from "../../public/assets/Screenshot 2025-05-01 154917.png";

const AboutPage = () => {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-24 pb-16 px-4 sm:px-8 relative max-w-6xl mx-auto"
      >
        <About />

        <section className="mt-16">
          <h3 className="text-3xl font-bold text-[var(--heading-color)] mb-6">
            Who was Mata Gujri Ji?
          </h3>

          <div className="grid md:grid-cols-2 gap-6 items-start mb-10">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src={image}
                alt="Mata Gujri Ji"
                className=" w-full h-full max-h-[320px]"
              />
            </div>

            <p className="text-[Var(--text-Secondary-color)] leading-relaxed text-justify">
              Mata Gujri was the first Sikh Martyr lady in the Sikh history. She
              is also distinguished by being the wife of a martyr (Guru Tegh
              Bahaar), mother of a martyr (Guru Gobind Singh), grandmother of
              four martyr Sahibzadas (Ajit Singh, Jujhar Singh, Zorawar Singh,
              and Fateh Singh), sister of a martyr ( Kirpal Chand) and aunt of
              five martyr sons of Bibi Viro, sister of Guru Tegh Bahadar. Mata
              Gujri was born to Bhai Lal Chand and Bibi Bishan Kaur, a pious
              couple, at Kartarpur, near Jullundur in Punjab. She was a noble
              soul, beautiful, cultured, sweet tongued, humble, ever happy,
              tender hearted , devoted wife and daughter- in-law. Mata Gujari Ji
              was married to Guru Tegh Bahadur Ji on 4 February 1633.Mata Gujri
              performed the humble duty of a devoted housewife and served her
              husband and mother-in-law.
            </p>
          </div>
          <p className="text-[Var(--text-Secondary-color)] leading-relaxed text-justify mb-10">
            In 1655 the family left for east India to spread Sikhism and avoid
            intrigues of selfish and frustrated relatives. In July, 1675 Guru
            Tegh Bahadur was arrested for supporting the Pandits. He along with
            three companions was taken to Delhi for the supreme sacrifice. Mata
            Gujri showed great courage at the time of parting. During his
            absence, she slept on the floor, took food once a day, and
            prayed.She took the responsibility of managing the affairs as Gobind
            Rai was very young. She brought him up like a prince, arranged for
            his education, and military training. Thus she prepared him for the
            great mission ahead. When in face of a prolonged siege Anandpur had
            to be evacuated by Guru Gobind Singh Ji on the night of 5-6 December
            1705, Mata Gujari with her younger grandsons, Zorawar Singh and
            Fateh Singh, aged nine and seven year respectively, was separated
            from the main body while crossing the Sirsa. The three of them were
            led by their servant, Gangu who treacherously betrayed them to the
            local Muslim officer. Mata Gujari and her grandsons were arrested on
            8 December and confined in the Thanda Burj, the cold tower. As the
            children were summoned to appear in court from day to day, the
            grandmother kept urging them to remain steadfast in their faith.
            Mata Gujri foresaw what was going to happen to them. She advised her
            grandsons not to give up their faith under any circumstances. She
            told them how their grandfather, Guru Tegh Bahadur had sacrificed
            his life and preferred death to conversion. She also related to them
            the sacrifice of Guru Arjan Dev and prepared them to face the
            governor boldly and not to bow before him. A farcical Trial began,
            in the Kacheri, (Court) of Suba Sirhind. It lasted for three days.
            On 27 December 1704, a heinous and cold-blooded crime was committed
            in the Sarzameen of Sirhind.
          </p>

          <div className="grid md:grid-cols-2 gap-6 items-start mb-1">
            <p className="text-[Var(--text-Secondary-color)] leading-relaxed text-justify">
              Guru Gobind Singh’s two younger sons, Baba Fateh Singh and Baba
              Zorawar Singh aged 7 and 9 years were bricked alive and later
              killed in the presence of the Assembly of Shaitans, presided over
              by Suba Sirhind, Wazir Khan. Mata Gujari ji attained martyrdom the
              same day as her grandsons at the age of 81.Two younger Sahibzadas
              and Mata Gujri were cremated by a devout Sikh,  Diwan Todar Mal ,
              at a spot, know known as Joyti Saroop Gurudwara. She was the wife
              of a supreme martyr; mother of a brave saint-soldier; and the
              grand-mother of four amazing children who all attained martyrdom
              at the ages of 6, 9, 14 and 18 years. It was because of her
              dedication that the young kids were so staunch in their faith and
              were at the young age of about 6 and 9 years able to stand up to
              the mighty  Mughal  empire and defy them.
            </p>

            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src={image_1}
                alt="Mata Gujri with grandsons"
                className="object- w-full h-full max-h-[320px]"
              />
            </div>
          </div>
          <p className="mb-10 text-[Var(--text-Secondary-color)] leading-relaxed text-justify">
            They gave up their precious lives but did not give up their Sikhi –
            a lot of the credit for bringing up such outstanding children must
            go to Mata ji. No doubt Guru Nanak Dev ji had said &quot;Why
            isn&#39;t woman equal to man when she is who gave birth to kings,
            and protectors of Dharma&quot;. Mata Gujar Kaur ji through
            upbringing of her grandsons played such an important role in  Sikhi
             that as Sikhs, we can owe our existence to her. It was due to her
            teachings that 6 year old and 9 year old did not bulge from their
            Dharma and attained martyrdom. Thus continuing and emphasizing the
            institute of martyrdom in Sikhism. Mata Gujari ji through upbringing
            of her grandsons played such an important role in Sikhism that as
            Sikhs, we can owe our
          </p>

          <div className="  rounded-xl  mb-10">
            <h2 className="text-2xl font-semibold text-[var(--heading-color)] mb-4">
              Message from the Director
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="overflow-hidden rounded-xl shadow-md">
                <img
                  src={image_3}
                  alt="Director"
                  className="object w-full h-full  max-h-[320px]"
                />
              </div>
              <p className="text-[Var(--text-Secondary-color)] leading-relaxed text-justify">
                Our mission is to improve the quality of Education in this
                region by improving the capabilities of human resources
                available and the impact of theory, practice and performance.
                Mata Gujri khalsa Shikshan Sansthan strives to earn its
                reputation through its innovative teaching methodology and
                quality of its pragmatic programmes. In this era of
                unprecedented competition,one can’t afford to luxuriate in rosy
                dreams. Today a career has to be carefully crafted by talent
                combined with diligence and   hardwork by inspiration blended
                with perspiration. We have to determent to excel in every field
                of activity. It is an Institution where growth is a way of life.
                Our students excel in every field of life. Every effort shall be
                made to keep this tradition alive.
              </p>
            </div>

            <p className="mt-4 text-[Var(--text-Secondary-color)] leading-relaxed   text-justify">
              Setting a goal in life and achieving it are two different things.
              It is the achievement of the goal that requires single-minded
              devotion and dedication as well as literally burning the midnight
              oil for its realization We are committed to the cause of producing
              citizens/leaders for the future who are not only endowed with high
              moral values and pleasant personally traits but also possess sound
              intellectual framework, analytical decision making skills and the
              ability to manage change with confidence. The Institution aims to
              be socially conscious and integrated ground contributing towards
              creation, dissemination and application of professional ,
              practical ,technical function so as to enable our students to
              transform themselves into goal-achievers in the fields of their
              choice ,Education ,that liberates the mind ,is the only bridge to
              a better world and we at MGKEI have pledged to dedicate our time
              and energy towards this worthy cause. We are fully seized of our
              responsibility towards your smooth and effective transformation
              from a student to a professional. For the fulfillments of this aim
              we give you immense opportunities to interact with business
              professionals. We also provide with the platform that gives you an
              opportunity to participate in various types of project works and
              interaction with organizations of high repute. I extend a warm
              welcome to the new aspirants to be a part of the great tradition
              of our Institution to avail the facilities &amp; enjoy all
              benefits under one roof and assure you that this is the right
              place for your career development because it’s our endeavour to
              create a workplace that will, ’Act Locally ,Think Globally’. I
              wish them fruitful years at MGKSS.
            </p>
            <p className="text-2xl font-bold text-[Var(--text-Secondary-color)] absolute right-0 px-4 sm:px-8 max-w-6xl">
              Smt.Darshanpal kaur
            </p>
          </div>
          <div className="  rounded-xl  mb-10">
            <h2 className="text-2xl font-semibold text-[var(--heading-color)] mb-4">
              About The Founder
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <p className="text-[Var(--text-Secondary-color)] leading-relaxed text-justify">
                The one man, whose vision changed millions of lives for the
                better, forever, is Adv.Sardool Singh Gill. A man of humble
                origins, even humbler demeanour, besides his gigantic
                achievements. He had toiled day and night to bring health,
                education, prosperity and happiness for this institution After
                completing his studies from Punjab university, Chandigarh, He
                started his carrier as an advocate at Sriganganagar . He had
                been elected President of Bar Association Elections in 2007. As
                a lawyer, he was simply one of the most outstanding of all.
                Extraordinarily brilliant, very well prepared in law and facts,
                extremely polite to the bench and to his opponents. Yet, with
                his fair presentation in a very soothing voice, he could win
                over both the bench and the bar. Also, as a human being, he was
                highly accomplished.
              </p>
              <div className="overflow-hidden rounded-xl shadow-md">
                <img
                  src={image_2}
                  alt="Director"
                  className="object w-full h-full  max-h-[320px]"
                />
              </div>
            </div>

            <p className="mt-4 text-[Var(--text-Secondary-color)] leading-relaxed text-justify">
              Possessed of noble virtues derived from his Mother Sardarni
              Jasmeil kaur, extremely well-read and well informed and widely
              travelled, He was an intellectual of a very high order. A great
              speaker and a patient listener, that made him an extremely
              enjoyable conversationalist, full of wit and information. Evenings
              spent with him would be treasured for a lifetime. He had a very
              deep love for humanity and the nation. He never missed reminding
              all who knew him about what was right and what was wrong in public
              life. His observations and remarks were a good guide to
              understanding the state of the nation. He strongly believed that
              quality Education only can bring about true transformation of the
              huge human resources of our nation. Mata Gujri khalsa Educational
              Institution, with the said philosophy begin its borne voyage in
              the ocean of academics with in the year 2004 with the blessing of
              his mother Sardarni Jasmeil kaur . The institution is given the
              name of a great women ‘Mata Gujri Ji’ who is a symbol of great
              sacrifice and patience. Mata Gujri holds the position of wife of a
              martyr, mother of martyr, the grandmother of martyrs and herself a
              martyr. He realized that in the society, Minority and Women
              section are deprived of right to education. The major factors
              contributing to lack of education of the women & minorities like
              Muslims, Christians, Sikhs, Buddhists and Zoroastrians (Parsis) is
              poverty geographical disparity, and accessibility.. He had an
              earnest desire to build up an institution which can spread the
              light of higher Education among the women and Minority section so
              that they can enhance their status and stature. For this
              purpose,he established Mata Gujri Khalsa College Of Education In
              2006 & applied for reserved Minority seats from National
              Commission for Minorities,New delhi. In pursuit of our Founder
              Chairman's social commitment, a modest beginning was made by
              starting a small educational institute more than 10 years ago,
              which is becoming big and touching the Pinnacle of success with
              the untiring attempts of our staff, constant support of parents
              and zealous performance of our students this institution. Today
              it’s a matter of pride that his lofty dream of a quality
              institution is taking shape through the untiring attempts of our
              staff, constant support of parents and zealous performance of our
              students.This small beginning is becoming big and touching the
              pinnacle of success. Today MGKEI is the only Minority institution
              of the region ,which protects the fundamental right to education
              of minorities. It was the profound desire and ardent endeavour of
              our founder to evolve an education process involving modern
              technology and knowledge with preservation of our cultural
              heritage.
            </p>
          </div>
        </section>
      </motion.div>
    </Layout>
  );
};

export default AboutPage;
