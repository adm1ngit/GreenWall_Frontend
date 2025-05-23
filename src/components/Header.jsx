function Header({ language, setLanguage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const translations = {
    uz: "Kafolat Xati Olish",
    ru: "Получить Гарантийный Талон",
    en: "Get Warranty Card",
  };

  return (
    <header className="flex justify-end p-4 z-50 top-0 right-1 md:top-5 md:right-5 absolute">
      <div className="flex items-center flex-col">
        <img 
          src={Translate} 
          alt="Translate" 
          className="md:w-[25px] w-5 md:h-[25px] h-5"
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-12 h-8 text-white bg-transparent border border-transparent rounded cursor-pointer"
          style={{ zIndex: 50 }}
        >
          <option className="bg-[#0C4840] text-white" value="ru">Ru</option>
          <option className="bg-[#0C4840] text-white" value="en">Eng</option>
          <option className="bg-[#0C4840] text-white" value="uz">Uz</option>
        </select>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#50D900] text-[white] px-6 py-3 rounded-full font-medium 
                   hover:bg-[#8CD48A] transition ml-4"
      >
        {translations[language]}
      </button>

      <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}
