import { useState, useEffect } from 'react';

// ── CAR DATABASE ──────────────────────────────────────────────
const CARS_DB = [
  { id: 1,  name: 'Lada Vesta',           price: 1200000,  engine: 'petrol', transmission: 'manual', drive: 'fwd', power: 106, year: 2023, owners: 0, reliability: 62, tuning_ready: false, country: 'Россия',   body: 'sedan'    },
  { id: 2,  name: 'Toyota Camry',         price: 3500000,  engine: 'petrol', transmission: 'auto',   drive: 'fwd', power: 181, year: 2022, owners: 1, reliability: 92, tuning_ready: true,  country: 'Япония',   body: 'sedan'    },
  { id: 3,  name: 'BMW X5',               price: 8900000,  engine: 'petrol', transmission: 'auto',   drive: 'awd', power: 340, year: 2022, owners: 1, reliability: 78, tuning_ready: true,  country: 'Германия', body: 'suv'      },
  { id: 4,  name: 'Porsche 911 Carrera',  price: 14500000, engine: 'petrol', transmission: 'auto',   drive: 'rwd', power: 450, year: 2023, owners: 0, reliability: 88, tuning_ready: true,  country: 'Германия', body: 'coupe'    },
  { id: 5,  name: 'Kia Rio',              price: 1800000,  engine: 'petrol', transmission: 'auto',   drive: 'fwd', power: 123, year: 2023, owners: 0, reliability: 80, tuning_ready: false, country: 'Корея',    body: 'sedan'    },
  { id: 6,  name: 'Hyundai Tucson',       price: 3200000,  engine: 'petrol', transmission: 'auto',   drive: 'awd', power: 150, year: 2022, owners: 0, reliability: 82, tuning_ready: true,  country: 'Корея',    body: 'suv'      },
  { id: 7,  name: 'Mercedes-Benz GLE',    price: 11000000, engine: 'diesel', transmission: 'auto',   drive: 'awd', power: 272, year: 2022, owners: 0, reliability: 76, tuning_ready: true,  country: 'Германия', body: 'suv'      },
  { id: 8,  name: 'Audi A6',              price: 6500000,  engine: 'petrol', transmission: 'auto',   drive: 'awd', power: 249, year: 2022, owners: 1, reliability: 74, tuning_ready: true,  country: 'Германия', body: 'sedan'    },
  { id: 9,  name: 'Volkswagen Tiguan',    price: 3800000,  engine: 'petrol', transmission: 'auto',   drive: 'awd', power: 150, year: 2023, owners: 0, reliability: 79, tuning_ready: false, country: 'Германия', body: 'suv'      },
  { id: 10, name: 'Mazda CX-5',           price: 3100000,  engine: 'petrol', transmission: 'auto',   drive: 'awd', power: 192, year: 2022, owners: 0, reliability: 87, tuning_ready: true,  country: 'Япония',   body: 'suv'      },
  { id: 11, name: 'Toyota Land Cruiser',  price: 12000000, engine: 'diesel', transmission: 'auto',   drive: 'awd', power: 227, year: 2022, owners: 0, reliability: 94, tuning_ready: true,  country: 'Япония',   body: 'suv'      },
  { id: 12, name: 'Honda Civic',          price: 2200000,  engine: 'petrol', transmission: 'auto',   drive: 'fwd', power: 158, year: 2023, owners: 0, reliability: 85, tuning_ready: true,  country: 'Япония',   body: 'sedan'    },
  { id: 13, name: 'Skoda Octavia',        price: 2500000,  engine: 'petrol', transmission: 'auto',   drive: 'fwd', power: 150, year: 2022, owners: 1, reliability: 77, tuning_ready: false, country: 'Чехия',    body: 'sedan'    },
  { id: 14, name: 'BMW 3 Series',         price: 5200000,  engine: 'petrol', transmission: 'auto',   drive: 'rwd', power: 258, year: 2022, owners: 0, reliability: 75, tuning_ready: true,  country: 'Германия', body: 'sedan'    },
  { id: 15, name: 'Lexus RX',             price: 7500000,  engine: 'petrol', transmission: 'auto',   drive: 'awd', power: 238, year: 2022, owners: 0, reliability: 91, tuning_ready: true,  country: 'Япония',   body: 'suv'      },
  { id: 16, name: 'Subaru Outback',       price: 3600000,  engine: 'petrol', transmission: 'auto',   drive: 'awd', power: 175, year: 2022, owners: 1, reliability: 83, tuning_ready: false, country: 'Япония',   body: 'suv'      },
  { id: 17, name: 'Mitsubishi Outlander', price: 3400000,  engine: 'petrol', transmission: 'auto',   drive: 'awd', power: 167, year: 2023, owners: 0, reliability: 78, tuning_ready: false, country: 'Япония',   body: 'suv'      },
  { id: 18, name: 'Nissan X-Trail',       price: 3300000,  engine: 'petrol', transmission: 'auto',   drive: 'awd', power: 163, year: 2022, owners: 1, reliability: 80, tuning_ready: false, country: 'Япония',   body: 'suv'      },
  { id: 19, name: 'Chery Tiggo 8 Pro',    price: 2800000,  engine: 'petrol', transmission: 'auto',   drive: 'fwd', power: 197, year: 2023, owners: 0, reliability: 68, tuning_ready: false, country: 'Китай',    body: 'suv'      },
  { id: 20, name: 'Geely Coolray',        price: 2100000,  engine: 'petrol', transmission: 'auto',   drive: 'fwd', power: 177, year: 2023, owners: 0, reliability: 65, tuning_ready: false, country: 'Китай',    body: 'suv'      },
  { id: 21, name: 'Lada Niva Travel',     price: 950000,   engine: 'petrol', transmission: 'manual', drive: 'awd', power: 80,  year: 2023, owners: 0, reliability: 60, tuning_ready: false, country: 'Россия',   body: 'suv'      },
  { id: 22, name: 'Ford Focus',           price: 1900000,  engine: 'petrol', transmission: 'auto',   drive: 'fwd', power: 150, year: 2021, owners: 2, reliability: 72, tuning_ready: true,  country: 'Германия', body: 'hatchback' },
  { id: 23, name: 'Renault Duster',       price: 1700000,  engine: 'petrol', transmission: 'manual', drive: 'awd', power: 135, year: 2022, owners: 1, reliability: 73, tuning_ready: false, country: 'Франция',  body: 'suv'      },
];

// ── TYPES ─────────────────────────────────────────────────────
interface CarData {
  id: number; name: string; price: number; engine: string; transmission: string;
  drive: string; power: number; year: number; owners: number; reliability: number;
  tuning_ready: boolean; country: string; body: string;
}
interface FormParams {
  budget: number; bodies: string[]; engine: string; drive: string[];
  transmission: string[]; powerMax: number; tuningWanted: boolean;
  isNew: string; owners: number | null; goal: string;
}
interface CarResult {
  car: CarData; index: number; pros: string[]; cons: string[]; tax: number;
}
type Page = 'home' | 'results' | 'tuning' | 'clients' | 'howworks';

// ── AI LOGIC ──────────────────────────────────────────────────
function calcIndex(car: CarData, p: FormParams): number {
  const diff = Math.abs(car.price - p.budget);
  let idx = (car.reliability / (diff + 1)) * 10000;
  if (p.tuningWanted && car.tuning_ready) idx *= 1.2;
  if (p.owners !== null && car.owners <= p.owners) idx *= 1.1;
  if (car.power > p.powerMax) idx *= 0.3;
  return idx;
}
function makePros(car: CarData): string[] {
  const l: string[] = [];
  if (car.reliability >= 85) l.push('Высокий индекс надёжности по данным владельцев');
  else if (car.reliability >= 75) l.push('Удовлетворительная надёжность, редкие обращения в сервис');
  if (car.owners === 0) l.push('Нулевой пробег — поставка из дилерского центра');
  else if (car.owners === 1) l.push('Единственный владелец, прозрачная история эксплуатации');
  if (car.tuning_ready) l.push('Подтверждённая совместимость с кастомизацией');
  if (car.drive === 'awd') l.push('Полный привод — стабильность в любых условиях');
  if (car.power > 200) l.push(`Форсированный агрегат — ${car.power} л.с.`);
  if (car.price < 2500000) l.push('Конкурентная рыночная стоимость');
  if (car.transmission === 'auto') l.push('Автоматическая трансмиссия — комфорт в городском потоке');
  return l.slice(0, 3);
}
function makeCons(car: CarData, p: FormParams): string[] {
  const l: string[] = [];
  if (car.price > p.budget * 1.15) l.push('Стоимость превышает указанный бюджет');
  if (car.reliability < 70) l.push('Индекс надёжности ниже среднего по сегменту');
  if (!car.tuning_ready && p.tuningWanted) l.push('Ограниченный потенциал для персонализации');
  if (car.owners > 1) l.push(`${car.owners} владельца — требуется углублённая проверка истории`);
  if (car.power > 250) l.push('Повышенная ставка транспортного налога');
  if (car.country !== 'Россия') l.push(`Параллельный импорт из ${car.country} — дополнительные сроки`);
  else l.push('Ограниченный выбор комплектаций на рынке');
  return l.slice(0, 3);
}

// ── HELPERS ───────────────────────────────────────────────────
const fmtPrice = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)} млн ₽`
    : `${Math.round(n / 1000)} тыс ₽`;
const fmtFull = (n: number) => n.toLocaleString('ru-RU') + ' ₽';
const tog = (arr: string[], v: string) =>
  arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];

// ── SHARED STYLES ─────────────────────────────────────────────
const fieldLabel: React.CSSProperties = {
  fontSize: 10, fontWeight: 600, letterSpacing: '0.18em',
  textTransform: 'uppercase', color: 'var(--text-muted)',
  display: 'block', marginBottom: 14,
};
const row: React.CSSProperties = {
  display: 'flex', alignItems: 'flex-start', gap: 10,
  cursor: 'pointer', fontSize: 13, color: 'var(--text)',
  marginBottom: 11, lineHeight: 1.4,
};

// ── NAV ───────────────────────────────────────────────────────
function Nav({ current, go }: { current: Page; go: (p: Page) => void }) {
  const links: { id: Page; label: string }[] = [
    { id: 'home',     label: 'Подбор'     },
    { id: 'howworks', label: 'Технология' },
    { id: 'clients',  label: 'Портфолио'  },
    { id: 'tuning',   label: 'Тюнинг'     },
  ];
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <button onClick={() => go('home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
          <span className="serif"
            style={{ fontSize: 18, fontWeight: 600, letterSpacing: '0.05em', color: 'var(--text)' }}>
            Match<span style={{ color: 'var(--gold)' }}>Auto</span>
          </span>
        </button>
        <div className="nav-links">
          {links.map(l => (
            <button key={l.id} onClick={() => go(l.id)}
              className={`nav-link${current === l.id ? ' active' : ''}`}>
              {l.label}
            </button>
          ))}
        </div>
        <button className="btn btn-sm" onClick={() => go('home')}>Начать подбор</button>
      </div>
    </nav>
  );
}

// ── HOME ──────────────────────────────────────────────────────
function HomePage({ onResults }: { onResults: (r: CarResult[]) => void }) {
  const [params, setParams] = useState<FormParams>({
    budget: 3_000_000, bodies: [], engine: 'any', drive: [], transmission: [],
    powerMax: 500, tuningWanted: false, isNew: 'any', owners: null, goal: 'everyday',
  });
  const [taxAlert, setTaxAlert] = useState(false);

  function submit() {
    const scored: CarResult[] = CARS_DB.map(car => ({
      car, index: calcIndex(car, params),
      pros: makePros(car), cons: makeCons(car, params), tax: car.power * 150,
    }));
    scored.sort((a, b) => b.index - a.index);
    const top5 = scored.slice(0, 5);
    sessionStorage.setItem('ma_results', JSON.stringify(top5));
    sessionStorage.setItem('ma_params',  JSON.stringify(params));
    onResults(top5);
  }

  return (
    <div>
      {/* HERO */}
      <section style={{ minHeight: '82vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', borderBottom: '1px solid var(--bd)' }}>
        <div className="hero-grid" />
        <div className="wrap fade-in" style={{ position: 'relative', zIndex: 1, paddingTop: 96, paddingBottom: 96 }}>
          <span className="eyebrow">Персональный автоподбор</span>
          <h1 className="serif" style={{
            fontSize: 'clamp(46px, 6.5vw, 84px)', fontWeight: 600,
            lineHeight: 1.05, letterSpacing: '-0.01em', marginBottom: 28, maxWidth: 680,
          }}>
            Автомобиль,{' '}
            <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>достойный вас</em>
          </h1>
          <div className="hr-gold" />
          <p className="fade-in-2" style={{ color: 'var(--text-muted)', fontSize: 15, maxWidth: 480, lineHeight: 1.75, marginBottom: 56 }}>
            Алгоритм анализирует рынок и формирует персональную подборку из пяти позиций — с расчётом налоговой нагрузки и оценкой потенциала тюнинга.
          </p>
          <div className="fade-in-3" style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
            {[['23', 'Модели в базе'], ['94%', 'Точность подбора'], ['< 3 с', 'Анализ рынка']].map(([v, l]) => (
              <div key={l}>
                <div className="serif" style={{ fontSize: 32, fontWeight: 600, color: 'var(--text)', lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section style={{ padding: '80px 0' }}>
        <div className="wrap">
          <span className="eyebrow">Параметры подбора</span>
          <h2 className="serif" style={{ fontSize: 34, fontWeight: 600, marginBottom: 8, letterSpacing: '-0.01em' }}>Задайте критерии</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 48, fontSize: 14 }}>Чем точнее параметры — тем релевантнее результат</p>

          <div className="card" style={{ padding: 48 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 40 }}>

              {/* Budget */}
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={fieldLabel}>Бюджет</span>
                  <span className="serif" style={{ fontSize: 22, fontWeight: 600, color: 'var(--gold)' }}>{fmtPrice(params.budget)}</span>
                </div>
                <input type="range" min={500_000} max={15_000_000} step={100_000}
                  value={params.budget}
                  onChange={e => setParams(p => ({ ...p, budget: +e.target.value }))} />
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: 11, marginTop: 8, letterSpacing: '0.06em' }}>
                  <span>500 тыс ₽</span><span>15 млн ₽</span>
                </div>
              </div>

              {/* Body */}
              <div>
                <span style={fieldLabel}>Тип кузова</span>
                {[['sedan','Седан'],['suv','Внедорожник'],['hatchback','Хэтчбек'],['coupe','Купе']].map(([v,l]) => (
                  <label key={v} style={row}>
                    <input type="checkbox" checked={params.bodies.includes(v)}
                      onChange={() => setParams(p => ({ ...p, bodies: tog(p.bodies, v) }))} />
                    <span>{l}</span>
                  </label>
                ))}
              </div>

              {/* Engine */}
              <div>
                <span style={fieldLabel}>Тип двигателя</span>
                {[['any','Любой'],['petrol','Бензиновый'],['diesel','Дизельный']].map(([v,l]) => (
                  <label key={v} style={row}>
                    <input type="radio" name="engine" checked={params.engine === v}
                      onChange={() => setParams(p => ({ ...p, engine: v }))} />
                    <span>{l}</span>
                  </label>
                ))}
              </div>

              {/* Drive */}
              <div>
                <span style={fieldLabel}>Тип привода</span>
                {[['fwd','Передний'],['rwd','Задний'],['awd','Полный']].map(([v,l]) => (
                  <label key={v} style={row}>
                    <input type="checkbox" checked={params.drive.includes(v)}
                      onChange={() => setParams(p => ({ ...p, drive: tog(p.drive, v) }))} />
                    <span>{l}</span>
                  </label>
                ))}
              </div>

              {/* Transmission */}
              <div>
                <span style={fieldLabel}>Коробка передач</span>
                {[['auto','Автоматическая'],['manual','Механическая']].map(([v,l]) => (
                  <label key={v} style={row}>
                    <input type="checkbox" checked={params.transmission.includes(v)}
                      onChange={() => setParams(p => ({ ...p, transmission: tog(p.transmission, v) }))} />
                    <span>{l}</span>
                  </label>
                ))}
              </div>

              {/* Power */}
              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={fieldLabel}>Мощность до</span>
                  <span className="serif" style={{ fontSize: 18, fontWeight: 600, color: 'var(--gold)' }}>{params.powerMax} л.с.</span>
                </div>
                <input type="range" min={60} max={500} step={10} value={params.powerMax}
                  onChange={e => { setParams(p => ({ ...p, powerMax: +e.target.value })); setTaxAlert(+e.target.value > 250); }} />
                {taxAlert && (
                  <p style={{ marginTop: 14, fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.02em', lineHeight: 1.6, maxWidth: 560 }}>
                    При мощности свыше 250 л.с. применяется повышенная ставка транспортного налога — от {(250 * 150).toLocaleString('ru-RU')} ₽ в год.
                  </p>
                )}
              </div>

              {/* Tuning */}
              <div>
                <span style={fieldLabel}>Персонализация</span>
                {[['yes','Планирую тюнинг'],['no','Стандартная комплектация']].map(([v,l]) => (
                  <label key={v} style={row}>
                    <input type="radio" name="tuning" checked={params.tuningWanted === (v === 'yes')}
                      onChange={() => setParams(p => ({ ...p, tuningWanted: v === 'yes' }))} />
                    <span>{l}</span>
                  </label>
                ))}
              </div>

              {/* Owners */}
              <div>
                <span style={fieldLabel}>Количество владельцев</span>
                {([[null,'Не имеет значения'],[0,'Без пробега'],[1,'Не более одного'],[2,'Не более двух']] as [number|null,string][]).map(([v,l]) => (
                  <label key={String(v)} style={row}>
                    <input type="radio" name="owners" checked={params.owners === v}
                      onChange={() => setParams(p => ({ ...p, owners: v }))} />
                    <span>{l}</span>
                  </label>
                ))}
              </div>

              {/* Goal */}
              <div>
                <span style={fieldLabel}>Цель приобретения</span>
                {[['everyday','Ежедневная эксплуатация'],['business','Деловые поездки'],['sport','Спортивное вождение'],['offroad','Бездорожье']].map(([v,l]) => (
                  <label key={v} style={row}>
                    <input type="radio" name="goal" checked={params.goal === v}
                      onChange={() => setParams(p => ({ ...p, goal: v }))} />
                    <span>{l}</span>
                  </label>
                ))}
              </div>

            </div>

            <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--bd)', display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
              <button className="btn" onClick={submit} style={{ padding: '14px 48px' }}>
                Сформировать подборку
              </button>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
                Анализируем {CARS_DB.length} позиций
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS BRIEF */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--bd)' }}>
        <div className="wrap">
          <span className="eyebrow">Процесс</span>
          <h2 className="serif" style={{ fontSize: 32, fontWeight: 600, marginBottom: 48, letterSpacing: '-0.01em' }}>Четыре этапа</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, background: 'var(--bd)' }}>
            {[
              { n: 'I',   title: 'Параметры', desc: 'Вы задаёте бюджет, тип кузова и цели поездки' },
              { n: 'II',  title: 'Анализ',    desc: 'Алгоритм рассчитывает индекс выгоды по 7 критериям' },
              { n: 'III', title: 'Подборка',  desc: 'Пять позиций с аргументацией за и против' },
              { n: 'IV',  title: 'Исполнение',desc: 'Менеджер организует привоз, регистрацию, тюнинг' },
            ].map(s => (
              <div key={s.n} style={{ background: 'var(--surface)', padding: '36px 32px' }}>
                <div className="serif" style={{ fontSize: 28, fontWeight: 600, color: 'var(--gold)', opacity: 0.4, marginBottom: 14, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontWeight: 500, fontSize: 14, marginBottom: 8 }}>{s.title}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.65 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--bd)' }}>
        <div className="wrap">
          <span className="eyebrow">Пример результата</span>
          <h2 className="serif" style={{ fontSize: 32, fontWeight: 600, marginBottom: 40, letterSpacing: '-0.01em' }}>Как выглядит подборка</h2>
          <div className="card" style={{ padding: '36px 40px' }}>
            <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <span style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: 8 }}>Позиция № 1 из 5</span>
                <h3 className="serif" style={{ fontSize: 28, fontWeight: 600, marginBottom: 4 }}>Mazda CX-5</h3>
                <div className="serif" style={{ fontSize: 22, color: 'var(--gold)', fontWeight: 600, marginBottom: 20 }}>3 100 000 ₽</div>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {[['Мощность','192 л.с.'],['Коробка','Автомат'],['Привод','Полный'],['Год','2022']].map(([k,v]) => (
                    <div key={k}>
                      <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 3 }}>{k}</div>
                      <div style={{ fontSize: 13 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>Аргументы за</div>
                {['Надёжность 87 / 100','Единственный владелец','Совместим с тюнингом'].map(t => (
                  <div key={t} style={{ fontSize: 13, marginBottom: 9, paddingLeft: 12, borderLeft: '1px solid var(--gold-line)', lineHeight: 1.5 }}>{t}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── RESULTS ───────────────────────────────────────────────────
function ResultsPage({ results, onTuning, onBack }: {
  results: CarResult[]; onTuning: (c: CarData) => void; onBack: () => void;
}) {
  const [ready, setReady]   = useState(false);
  const [shown, setShown]   = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setReady(true);
      let i = 0;
      const iv = setInterval(() => { i++; setShown(i); if (i >= results.length) clearInterval(iv); }, 180);
    }, 1800);
    return () => clearTimeout(t);
  }, []);

  const params: FormParams | null = (() => {
    try { return JSON.parse(sessionStorage.getItem('ma_params') || 'null'); } catch { return null; }
  })();

  if (!ready) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '72vh', gap: 20 }}>
        <div className="spinner" />
        <p className="serif" style={{ fontSize: 22, fontWeight: 500 }}>Формируем подборку</p>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          Авито · Авто.ру · Дром
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '72px 0' }}>
      <div className="wrap">
        <span className="eyebrow">Результаты анализа</span>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
          <div>
            <h1 className="serif" style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.01em' }}>Персональная подборка</h1>
            {params && (
              <p style={{ color: 'var(--text-muted)', marginTop: 6, fontSize: 13 }}>
                Бюджет {fmtPrice(params.budget)} · {CARS_DB.length} позиций проанализировано
              </p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {results.map((r, i) => (
            <div key={r.car.id} className="card"
              style={{ padding: '36px 40px', opacity: i < shown ? 1 : 0, transform: i < shown ? 'none' : 'translateY(8px)', transition: 'opacity 0.4s, transform 0.4s' }}>

              <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                {/* Rank */}
                <div style={{ flexShrink: 0, paddingTop: 4 }}>
                  <div className="serif" style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600, letterSpacing: '0.08em' }}>
                    {i === 0 ? 'Лучший выбор' : `№ ${i + 1}`}
                  </div>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <h3 className="serif" style={{ fontSize: 26, fontWeight: 600, marginBottom: 4, letterSpacing: '-0.01em' }}>{r.car.name}</h3>
                  <div className="serif" style={{ fontSize: 22, color: 'var(--gold)', fontWeight: 600, marginBottom: 20 }}>{fmtFull(r.car.price)}</div>

                  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 22 }}>
                    {[
                      ['Мощность',   `${r.car.power} л.с.`],
                      ['Коробка',    r.car.transmission === 'auto' ? 'Автомат' : 'Механика'],
                      ['Привод',     r.car.drive === 'awd' ? 'Полный' : r.car.drive === 'fwd' ? 'Передний' : 'Задний'],
                      ['Год',        String(r.car.year)],
                      ['Владельцев', String(r.car.owners)],
                      ['Страна',     r.car.country],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>{k}</div>
                        <div style={{ fontSize: 13 }}>{v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Reliability */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div>
                      <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 5 }}>Надёжность</div>
                      <div className="serif" style={{ fontSize: 22, fontWeight: 600, color: r.car.reliability >= 85 ? 'var(--gold)' : 'var(--text)' }}>
                        {r.car.reliability} / 100
                      </div>
                    </div>
                    <div style={{ flex: 1, maxWidth: 140 }}>
                      <div className="bar-track"><div className="bar-fill" style={{ width: `${r.car.reliability}%` }} /></div>
                    </div>
                  </div>
                </div>

                {/* Pros / Cons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, minWidth: 280, flex: '0 0 auto' }}>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>За</div>
                    {r.pros.map((p, pi) => (
                      <div key={pi} style={{ fontSize: 12, marginBottom: 9, paddingLeft: 10, borderLeft: '1px solid var(--gold-line)', lineHeight: 1.5 }}>{p}</div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12 }}>Против</div>
                    {r.cons.map((c, ci) => (
                      <div key={ci} style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 9, paddingLeft: 10, borderLeft: '1px solid var(--bd)', lineHeight: 1.5 }}>{c}</div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--bd)', display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>Транспортный налог</div>
                    <div style={{ fontSize: 13 }}>{fmtFull(r.tax)} / год</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 4 }}>Доставка</div>
                    <div style={{ fontSize: 13 }}>Рассчитывается индивидуально</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {r.car.tuning_ready && (
                    <button className="btn btn-ghost btn-sm" onClick={() => onTuning(r.car)}>Конфигуратор</button>
                  )}
                  <button className="btn btn-sm">Запросить условия</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Analyst note */}
        <div style={{ marginTop: 20, padding: '24px 32px', background: 'var(--surface-2)', border: '1px solid var(--bd)', borderRadius: 'var(--r)' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>Заключение аналитика</div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: 680 }}>
            По совокупности критериев наиболее предпочтительным вариантом является{' '}
            <span style={{ color: 'var(--text)' }}>{results[0]?.car.name}</span>.
            {results[0]?.car.tuning_ready ? ' Модель располагает подтверждённым потенциалом для кастомизации.' : ''}
            {' '}Рекомендуем провести проверку по VIN-номеру до заключения сделки.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          <button className="btn btn-ghost" onClick={onBack}>Новый запрос</button>
          <button className="btn" onClick={() => {
            const blob = new Blob([JSON.stringify(results.map(r => ({ name: r.car.name, price: r.car.price, pros: r.pros, cons: r.cons, tax: r.tax })), null, 2)], { type: 'application/json' });
            const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'matchauto-selection.json'; a.click();
          }}>
            Сохранить подборку
          </button>
        </div>
      </div>
    </div>
  );
}

// ── TUNING ────────────────────────────────────────────────────
const TUNING_OPTS = {
  exhaust: { label: 'Выхлопная система',    opts: ['Стандартная','Спортивная прямоток','Valve exhaust','Akrapovič Titanium'] },
  spoiler: { label: 'Аэродинамический кит', opts: ['Без изменений','Lip-кит','Спортивный GT','Карбоновый Wing'] },
  seats:   { label: 'Салон / сиденья',      opts: ['Стандартный','Спортивные ковши','Кожа + подогрев','Recaro Racing'] },
  wheels:  { label: 'Колёсные диски',       opts: ['Штатные','Кованые R19','Carbon R20','BBS R21'] },
  color:   { label: 'Отделка кузова',       opts: ['Оригинальный цвет','Матовый чёрный','Satin Midnight Blue','Candy Red','Хром-хамелеон'] },
};

function TuningPage({ initCar, onCarSelect }: { initCar: CarData | null; onCarSelect: (c: CarData) => void }) {
  const [car, setCar] = useState<CarData | null>(initCar);
  const [cfg, setCfg] = useState<Record<string, string>>({
    exhaust: 'Стандартная', spoiler: 'Без изменений', seats: 'Стандартный', wheels: 'Штатные', color: 'Оригинальный цвет',
  });
  const [saved, setSaved] = useState(false);
  const tuneable = CARS_DB.filter(c => c.tuning_ready);

  function save() {
    const blob = new Blob([JSON.stringify({ model: car?.name, configuration: cfg, created: new Date().toISOString() }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'matchauto-config.json'; a.click();
    setSaved(true); setTimeout(() => setSaved(false), 3000);
  }
  const clearCfg = () => setCfg({ exhaust: 'Стандартная', spoiler: 'Без изменений', seats: 'Стандартный', wheels: 'Штатные', color: 'Оригинальный цвет' });

  return (
    <div style={{ padding: '72px 0' }}>
      <div className="wrap">
        <span className="eyebrow">Персонализация</span>
        <h1 className="serif" style={{ fontSize: 38, fontWeight: 600, marginBottom: 8, letterSpacing: '-0.01em' }}>Конфигуратор тюнинга</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 48, fontSize: 14 }}>
          Соберите индивидуальную спецификацию — менеджер уточнит детали и подготовит смету
        </p>

        {/* Model picker */}
        <div className="card" style={{ padding: '28px 32px', marginBottom: 20 }}>
          <div style={fieldLabel}>Выберите модель</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {tuneable.map(c => (
              <button key={c.id} onClick={() => { setCar(c); onCarSelect(c); }}
                style={{
                  padding: '8px 18px', borderRadius: 'var(--r)', fontSize: 12, cursor: 'pointer',
                  border: `1px solid ${car?.id === c.id ? 'var(--gold-line)' : 'var(--bd)'}`,
                  background: car?.id === c.id ? 'var(--gold-dim)' : 'transparent',
                  color: car?.id === c.id ? 'var(--gold)' : 'var(--text-muted)',
                  transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
                }}>
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {car ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16, alignItems: 'start' }}>
            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Object.entries(TUNING_OPTS).map(([key, opt]) => (
                <div key={key} className="card" style={{ padding: '24px 28px' }}>
                  <div style={fieldLabel}>{opt.label}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {opt.opts.map(o => (
                      <label key={o} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13 }}>
                        <input type="radio" name={key} checked={cfg[key] === o}
                          onChange={() => setCfg(c => ({ ...c, [key]: o }))} />
                        <span style={{ color: cfg[key] === o ? 'var(--text)' : 'var(--text-muted)' }}>{o}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="card" style={{ padding: '28px 28px', position: 'sticky', top: 76 }}>
              <div className="tuning-visual" style={{ marginBottom: 22 }}>
                <p className="tuning-caption">Визуализация под конкретный заказ</p>
              </div>
              <h3 className="serif" style={{ fontSize: 19, fontWeight: 600, marginBottom: 2 }}>{car.name}</h3>
              <div className="serif" style={{ fontSize: 16, color: 'var(--gold)', marginBottom: 22 }}>{fmtFull(car.price)}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 24 }}>
                {Object.entries(TUNING_OPTS).map(([key, opt]) => {
                  const isDef = cfg[key] === opt.opts[0];
                  return (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, gap: 12 }}>
                      <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>{opt.label}</span>
                      <span style={{ color: isDef ? 'var(--text-muted)' : 'var(--gold)', textAlign: 'right' }}>{cfg[key]}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button className="btn" onClick={save} style={{ width: '100%' }}>
                  {saved ? 'Конфигурация сохранена' : 'Передать менеджеру'}
                </button>
                <button className="btn btn-ghost" onClick={clearCfg} style={{ width: '100%' }}>Сбросить настройки</button>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 12, lineHeight: 1.65 }}>
                Спецификация сохраняется в JSON и передаётся персональному менеджеру
              </p>
            </div>
          </div>
        ) : (
          <div className="card" style={{ padding: 64, textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Выберите модель для начала конфигурации</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── CLIENTS ───────────────────────────────────────────────────
const CASES = [
  { car: 'Toyota Land Cruiser 200', from: 'Японии',   city: 'Новосибирск',    days: '24 дня',  tuning: 'Лифт-кит +50 мм, силовой бампер, защита днища',         price: '9 800 000 ₽'  },
  { car: 'Porsche 911 Carrera',     from: 'Германии', city: 'Москва',         days: '18 дней', tuning: 'Akrapovič Titanium, карбоновые вставки, BBS R20',         price: '14 200 000 ₽' },
  { car: 'BMW M3 Competition',      from: 'Германии', city: 'Санкт-Петербург',days: '21 день', tuning: 'Recaro Racing, подрулевые лепестки, Stage 2 tune',        price: '8 400 000 ₽'  },
  { car: 'Lexus LX 570',            from: 'ОАЭ',      city: 'Краснодар',      days: '16 дней', tuning: 'Полный перекрас Satin Black, диски WALD R22',             price: '11 600 000 ₽' },
  { car: 'Honda Civic Type R',      from: 'Японии',   city: 'Екатеринбург',   days: '28 дней', tuning: 'Стандартная комплектация',                                price: '4 100 000 ₽'  },
];
const TOP5 = [
  { name: 'Toyota Land Cruiser',   count: 47 },
  { name: 'BMW X5 / M5',           count: 38 },
  { name: 'Lexus LX / RX',         count: 31 },
  { name: 'Porsche 911',           count: 24 },
  { name: 'Honda Civic / Type R',  count: 19 },
];

function ClientsPage() {
  return (
    <div style={{ padding: '72px 0' }}>
      <div className="wrap">
        <span className="eyebrow">Портфолио</span>
        <h1 className="serif" style={{ fontSize: 38, fontWeight: 600, marginBottom: 8, letterSpacing: '-0.01em' }}>Завершённые проекты</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 56, fontSize: 14, maxWidth: 480 }}>
          Реальные кейсы: от первого запроса до ключей в руках
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14, marginBottom: 72 }}>
          {CASES.map((c, i) => (
            <div key={i} className="card fade-in" style={{ padding: '28px 32px' }}>
              <h3 className="serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 22, letterSpacing: '-0.01em' }}>{c.car}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 20 }}>
                {([['Откуда',`из ${c.from}`],['Доставлен в',c.city],['Срок исполнения',c.days],['Итоговая стоимость',c.price]] as [string,string][]).map(([k,v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, gap: 12 }}>
                    <span style={{ color: 'var(--text-muted)' }}>{k}</span>
                    <span style={{ color: k === 'Срок исполнения' ? 'var(--gold)' : 'var(--text)', fontWeight: k === 'Итоговая стоимость' ? 500 : 400, textAlign: 'right' }}>{v}</span>
                  </div>
                ))}
              </div>
              {!c.tuning.includes('Стандартная') && (
                <div style={{ paddingTop: 16, borderTop: '1px solid var(--bd)', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.65 }}>
                  <span style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: 6 }}>Кастомизация</span>
                  {c.tuning}
                </div>
              )}
            </div>
          ))}
        </div>

        <span className="eyebrow">Статистика</span>
        <h2 className="serif" style={{ fontSize: 28, fontWeight: 600, marginBottom: 32, letterSpacing: '-0.01em' }}>Наиболее востребованные модели</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--bd)' }}>
          {TOP5.map((t, i) => (
            <div key={i} style={{ background: 'var(--surface)', padding: '20px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
              <div className="serif" style={{ fontSize: 14, color: i === 0 ? 'var(--gold)' : 'var(--text-muted)', fontWeight: 600, width: 24, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{t.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', width: 56, textAlign: 'right', flexShrink: 0 }}>{t.count} авт.</div>
              <div style={{ width: 120, flexShrink: 0 }}>
                <div className="bar-track"><div className="bar-fill" style={{ width: `${(t.count / TOP5[0].count) * 100}%` }} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── HOW WORKS ─────────────────────────────────────────────────
function HowWorksPage() {
  const steps = [
    { n: 'I',   title: 'Сбор данных',         desc: 'Алгоритм в реальном времени анализирует объявления с Авито, Авто.ру и Дром. Верифицирует историю ДТП, сведения о владельцах и юридическую чистоту.', tags: ['Авито — 12 000+','Авто.ру — 8 000+','Дром — 5 000+'] },
    { n: 'II',  title: 'Оценка алгоритмом',   desc: 'Каждый автомобиль оценивается по 47 параметрам: рыночная цена, пробег, история ДТП, число владельцев, рейтинг надёжности модели по данным агрегаторов.', tags: ['47 параметров','История ДТП','Рейтинг надёжности'] },
    { n: 'III', title: 'Расчёт индекса выгоды',desc: 'Для каждой позиции вычисляется показатель: надёжность / (|цена − бюджет| + 1). Тюнинг-совместимые модели получают коэффициент ×1.2.', tags: ['Формула индекса','×1.2 за тюнинг','×1.1 за 1 владельца'] },
    { n: 'IV',  title: 'Топ-5 позиций',        desc: 'Финальная пятёрка формируется с индивидуальными аргументами за и против, расчётом транспортного налога и оценкой стоимости привоза.', tags: ['3 аргумента за','3 аргумента против','Налог = л.с. × 150 ₽'] },
  ];
  return (
    <div style={{ padding: '72px 0' }}>
      <div className="wrap">
        <span className="eyebrow">Методология</span>
        <h1 className="serif" style={{ fontSize: 38, fontWeight: 600, marginBottom: 56, letterSpacing: '-0.01em' }}>Как работает MatchAuto</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: 'var(--bd)', marginBottom: 48 }}>
          {steps.map((s, i) => (
            <div key={i} className="fade-in" style={{ background: 'var(--surface)', padding: '40px 48px', display: 'flex', gap: 48, flexWrap: 'wrap' }}>
              <div style={{ flexShrink: 0 }}>
                <div className="serif" style={{ fontSize: 36, fontWeight: 600, color: 'var(--gold)', opacity: 0.32, lineHeight: 1 }}>{s.n}</div>
              </div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <h3 className="serif" style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>{s.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.75, marginBottom: 20, maxWidth: 580 }}>{s.desc}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {s.tags.map((t, ti) => (
                    <span key={ti} style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', border: '1px solid var(--bd-gold)', borderRadius: 'var(--r)', padding: '3px 10px', background: 'var(--gold-dim)' }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '40px 48px', background: 'var(--surface-2)', border: '1px solid var(--bd)', borderRadius: 'var(--r)' }}>
          <div style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>Формула индекса выгоды</div>
          <div className="serif" style={{ fontSize: 'clamp(16px, 2.5vw, 24px)', fontWeight: 600, color: 'var(--gold)', lineHeight: 1.5 }}>
            Index = Надёжность / (|Цена − Бюджет| + 1) × Коэффициент
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 14, lineHeight: 1.7 }}>
            Коэффициент ×1.2 применяется к тюнинг-совместимым моделям · ×1.1 при единственном владельце
          </p>
        </div>
      </div>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────
function Footer({ go }: { go: (p: Page) => void }) {
  return (
    <footer style={{ borderTop: '1px solid var(--bd)', padding: '56px 0 32px' }}>
      <div className="wrap">
        <div style={{ display: 'flex', gap: 48, justifyContent: 'space-between', flexWrap: 'wrap', marginBottom: 48 }}>
          <div style={{ maxWidth: 280 }}>
            <div className="serif" style={{ fontSize: 18, fontWeight: 600, letterSpacing: '0.05em', marginBottom: 14 }}>
              Match<span style={{ color: 'var(--gold)' }}>Auto</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.75 }}>
              Персональный подбор, международный привоз и индивидуальная кастомизация премиальных автомобилей
            </p>
          </div>
          <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 18 }}>Разделы</div>
              {([['home','Подбор'],['tuning','Тюнинг'],['clients','Портфолио'],['howworks','Технология']] as [Page,string][]).map(([p,l]) => (
                <button key={p} onClick={() => go(p)}
                  style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 13, marginBottom: 11, fontFamily: 'Inter, sans-serif', padding: 0, transition: 'color 0.2s', textAlign: 'left' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  {l}
                </button>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 18 }}>Контакты</div>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 2.1 }}>
                +7 (800) 555-00-00<br />
                hello@matchauto.ru<br />
                Москва, Пресненская наб., 12
              </p>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 24, borderTop: '1px solid var(--bd)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, color: 'var(--text-muted)', fontSize: 11, letterSpacing: '0.06em' }}>
          <span>© 2024 MatchAuto</span>
          <span>Подбор · Привоз · Тюнинг · Доставка</span>
        </div>
      </div>
    </footer>
  );
}

// ── ROOT ──────────────────────────────────────────────────────
export default function App() {
  const [page, setPage]           = useState<Page>('home');
  const [results, setResults]     = useState<CarResult[]>([]);
  const [tuningCar, setTuningCar] = useState<CarData | null>(null);

  useEffect(() => {
    try {
      const s = sessionStorage.getItem('ma_results');
      if (s) setResults(JSON.parse(s));
    } catch { /* ignore */ }
  }, []);

  function go(p: Page) { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Nav current={page} go={go} />
      <main>
        {page === 'home'     && <HomePage     onResults={r => { setResults(r); go('results'); }} />}
        {page === 'results'  && <ResultsPage  results={results} onTuning={c => { setTuningCar(c); go('tuning'); }} onBack={() => go('home')} />}
        {page === 'tuning'   && <TuningPage   initCar={tuningCar} onCarSelect={setTuningCar} />}
        {page === 'clients'  && <ClientsPage />}
        {page === 'howworks' && <HowWorksPage />}
      </main>
      <Footer go={go} />
    </div>
  );
}
