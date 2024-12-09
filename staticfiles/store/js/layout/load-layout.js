document.addEventListener("DOMContentLoaded", () => {
  const currentPath = window.location.pathname;
  const username = window.userContext.username;
  const isAuthenticated = window.userContext.isAuthenticated;
  const profileImageUrl = window.userContext.profileImageUrl;

  function addHamburgerMenu() {
    const hamburgerMenuSlot = document.querySelector(".HamburgerMenuSlot");
    const hamburgerMenuContainer = document.createElement("div");

    hamburgerMenuContainer.innerHTML = `
    <div class="overlay_menu_bg"></div>
    <div role="navigation" class="responsive_page_menu_ctn mainmenu" aria-label="Menú móvil">
      <div id="responsive_page_menu" class="responsive_page_menu">
        <div class="mainmenu_contents">
          <div class="mainmenu_contents_items">
            <div class="void_div"></div>
            <div id="menu_user_area" class="menu_user_area">
              <div class="menu_user_person person online">
                <div class="playerAvatar online">
                  <a id="profileLink" href="#" aria-label="Ver tu perfil">
                    <img id="user_avatar" src="/static/store/images/profile/user-avatar.jpg" alt="">
                  </a>
                </div>
                <a id="user_name" href="">Username</a>
              </div>
            </div>
            <a id="hamburger_session_link" class="menuitem" href="/login">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M10 11H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8h6v3l5-4l-5-4z"/></svg>
                Iniciar sesión
              </span>
            </a>
            <a class="menuitem supernav supernav_active isLogged" href="javascript:void(0)">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.83 12.99L11.83 2H2v9.83l10.99 10.99zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4S7 4.67 7 5.5S6.33 7 5.5 7"/>
              </svg>
              Tienda
              <div class="chevron"></div>
            </a>
            <div class="menuitem_submenu_wrapper" style="height: 0px">
            <div class="submenu_Store">
              <a class="submenuitem" href="/"> Página principal </a>
              <a class="submenuitem" href="/ofertas-especiales"> Ofertas especiales </a>
              <a class="submenuitem" href="/ActivisionPublisherSale2024"> Eventos de rebajas </a>
              <a class="submenuitem" href="/tienda"> Todos los juegos </a>
              <a class="submenuitem" href="/juegos-populares"> Juegos populares </a>
              <a class="submenuitem" href="/juegos-y-tarjetas"> Juegos y tarjetas </a>
              <a class="submenuitem" href="javascript:void(0)"> Géneros </a>
            </div>
          </div>
            <a class="menuitem supernav isLogged" href="/profiles/notifications">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5 19q-.425 0-.712-.288T4 18t.288-.712T5 17h1v-7q0-2.075 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062T12 2t1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h1q.425 0 .713.288T20 18t-.288.713T19 19zm7 3q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22"/>
              </svg>
              Notificaciones
            </a>
            <a class="menuitem supernav isLogged" href="/cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <g fill="none">
                  <path fill="currentColor" d="M18 15H7L5.5 6H21z"/>
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.5 3m0 0L7 15h11l3-9z"/>
                  <circle cx="8" cy="20" r="1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  <circle cx="17" cy="20" r="1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                </g>
              </svg>
              Carro de compras
            </a>
            <div class="minor_menu_items">
              <a class="menuitem" href="/about">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.712T12 11t-.712.288T11 12v4q0 .425.288.713T12 17m0-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                </svg>
                Acerca de
              </a>
              <a class="menuitem" href="/help">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M11.95 18q.525 0 .888-.363t.362-.887t-.362-.888t-.888-.362t-.887.363t-.363.887t.363.888t.887.362m-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.312.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825M12 22q-2.075 0-3.9-.787t-3.175-2.138T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                </svg>
                Soporte
              </a>
              <a id="logout" class="menuitem" href="/logout">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M5 2h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m4 9V8l-5 4l5 4v-3h6v-2z"/>
                </svg>
                Cerrar sesión
              </a>
            </div>
          </div>
          <div class="mainmenu_footer_spacer"></div>
          <div class="mainmenu_footer">
            <div class="mainmenu_footer_logo">
              <img src="/static/store/images/mega-games-logo.svg" height="36" alt="Mega Games" />
              <span class="grotesk fs-6">Mega Games</span>
            </div>
            © 2024 Mega Games Store. Página creada con fines didácticos e inspirada en Steam y Eneba. No tiene relación oficial con estas marcas. Las imágenes utilizadas son para prácticas educativas. Nombres y marcas mencionados son propiedad de sus respectivos dueños.
            <span class="mainmenu_footer_links">
              <a class="fw-medium footer_link2 mb-4 me-1" href="#">Términos y condiciones</a>
              |
              <a class="fw-medium footer_link2 mb-4 ms-1 me-1" href="#">Aviso de privacidad</a>
              |
              <a class="fw-medium footer_link2 mb-4 ms-1" href="#">Reembolsos</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

    hamburgerMenuSlot.appendChild(hamburgerMenuContainer);

    if (isAuthenticated) {
      document.getElementById("profileLink").href = `/profile/${username}`;
      document.getElementById("user_name").href = `/profile/${username}`;
    }
  }

  function addDesktopHeader() {
    const headerSlot = document.querySelector(".HeaderSlotDesktop");
    const headerContainer = document.createElement("header");
    headerContainer.id = "global_header";

    headerContainer.innerHTML = `
    <nav class="content">
        <div class="logo">
            <span id="logo_holder">
                <a href="/" aria-label="Enlace a la página de inicio de Mega Games">
                    <img src="/static/store/images/mega-games-logo.svg" width="36" height="36" alt="Enlace a la página de inicio de Mega Games">
                </a>
                <a href="/">Mega Games</a>
            </span>
        </div>
        <div role="navigation" class="supernav_container" aria-label="Menú global">
            <a class="menuitem supernav" href="/">Tienda</a>
            <a class="menuitem supernav" href="/community/">Comunidad</a>
            <a class="menuitem supernav" href="/about/">Acerca de</a>
            <a class="menuitem supernav" href="/help/">Soporte</a>
        </div>
        <div id="global_actions">
            <div id="global_action_menu" role="navigation" aria-label="Menú de la cuenta">
                <a class="header_login_btn" href="/about">
                    <div class="main_btn">Instalar Mega Games</div>
                </a>
                <a id="session_link" class="global_action_link" href="/login">Iniciar sesión</a>
                <div id="header_notification_area" style="display: none; position: relative">
                <div>
                  <div>
                    <div id="green_envelope_menu_root" class="notification_ctn">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" class="notification_svg">
                        <g class="SVGIcon_Notification">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M32 24V26H4V24L8 19V12C8 9.34784 9.05357 6.8043 10.9289 4.92893C12.8043 3.05357 15.3478 2 18 2C20.6522 2 23.1957 3.05357 25.0711 4.92893C26.9464 6.8043 28 9.34784 28 12V19L32 24Z" fill="currentColor"></path>
                          <path class="SVGIcon_Notification_Uvula" fill-rule="evenodd" clip-rule="evenodd" d="M18 34C19.2396 33.9986 20.4483 33.6133 21.46 32.897C22.4718 32.1807 23.2368 31.1687 23.65 30H12.35C12.7632 31.1687 13.5282 32.1807 14.54 32.897C15.5517 33.6133 16.7604 33.9986 18 34Z" fill="currentColor"></path>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
                <div id="header_notification_link" class="header_notification_btn global_header_toggle_button header_notification_bell" style="background-color: rgba(0, 0, 0, 0)"></div>
                </div>
                <span class="pulldown global_action_link persona_name_text_content" id="account_pulldown" onclick="ShowMenu('account_dropdown')" style="display: none;">User</span>
                <div id="account_dropdown" class="popup_block_new" style="visibility: visible; top: 25px; left: 24.7344px; right: 65px; display: none; opacity: 1;">
                  <div class="popup_body popup_menu">
                    <a id="accountLink" class="popup_menu_item" href="#">Ver mi perfil</a>
                    <a class="popup_menu_item" href="/account/history/">Detalles de la cuenta: <span id="account_name" class="account_name"></span></a>
                    <span class="popup_menu_item" id="language_pulldown_account" onclick="ShowMenu('language_dropdown_account');">Cambiar idioma</span>
                    <div class="popup_block_new language" id="language_dropdown_account" style="display: none; opacity: 0; left: -274px; top: 62px;"></div>
                    <a id="logout_link" class="popup_menu_item" href="/login">Cerrar sesión...</a>
                  </div>
                </div>
                &nbsp;|&nbsp;
                <span class="pulldown global_action_link" id="language_pulldown" onclick="ShowMenu('language_dropdown', 'right');">idioma</span>
                <div id="language_dropdown" class="popup_block_new" style="display: none;"></div>
            </div>
            <a id="user_img" class="user_avatar playerAvatar online" aria-label="Ver tu perfil" href="#">
              <img id="profile_img_src" src="" alt="" loading="lazy">
            </a>
        </div>
    </nav>
`;

    headerSlot.appendChild(headerContainer);

    document.getElementById("profile_img_src").src = profileImageUrl;

    const navItems = document.querySelectorAll(".supernav");
    let isActive = false;

    navItems.forEach((item) => {
      const itemPath = new URL(item.href, window.location.origin).pathname;
      if (itemPath === currentPath) {
        item.classList.add("supernav_active");
        isActive = true;
      }
    });

    if (!isActive) {
      navItems[0].classList.add("supernav_active");
    }

    if (isAuthenticated) {
      document.getElementsByClassName(
        "playerAvatar"
      )[0].href = `/profile/${username}`;
      document.getElementById("accountLink").href = `/profile/${username}`;
      document.getElementById("session_link").style.display = "none";
      document.getElementById("account_pulldown").style.display = "inline";
    } else {
      document.getElementById("account_pulldown").style.display = "none";
      document.getElementById("user_img").style.display = "none";
    }

    const globalActionMenu = document.getElementById("global_action_menu");
    const languagePulldown = document.getElementById("language_pulldown");
    const lenguageDropdown = document.getElementById("language_dropdown");
    const languageDropdownAccount = document.getElementById(
      "language_dropdown_account"
    );
    const lenguageHTML = `
    <div class="popup_body popup_menu">
        <a class="popup_menu_item tight" href="?l=schinese" onclick="ChangeLanguage( 'schinese' ); return false;">简体中文 (chino simplificado)</a>
        <a class="popup_menu_item tight" href="?l=tchinese" onclick="ChangeLanguage( 'tchinese' ); return false;">繁體中文 (chino tradicional)</a>
        <a class="popup_menu_item tight" href="?l=japanese" onclick="ChangeLanguage( 'japanese' ); return false;">日本語 (japonés)</a>
        <a class="popup_menu_item tight" href="?l=koreana" onclick="ChangeLanguage( 'koreana' ); return false;">한국어 (coreano)</a>
        <a class="popup_menu_item tight" href="?l=thai" onclick="ChangeLanguage( 'thai' ); return false;">ไทย (tailandés)</a>
        <a class="popup_menu_item tight" href="?l=bulgarian" onclick="ChangeLanguage( 'bulgarian' ); return false;">Български (búlgaro)</a>
        <a class="popup_menu_item tight" href="?l=czech" onclick="ChangeLanguage( 'czech' ); return false;">Čeština (checo)</a>
        <a class="popup_menu_item tight" href="?l=danish" onclick="ChangeLanguage( 'danish' ); return false;">Dansk (danés)</a>
        <a class="popup_menu_item tight" href="?l=german" onclick="ChangeLanguage( 'german' ); return false;">Deutsch (alemán)</a>
        <a class="popup_menu_item tight" href="?l=english" onclick="ChangeLanguage( 'english' ); return false;">English (inglés)</a>
        <a class="popup_menu_item tight" href="?l=latam" onclick="ChangeLanguage( 'latam' ); return false;">Español de Hispanoamérica</a>
        <a class="popup_menu_item tight" href="?l=greek" onclick="ChangeLanguage( 'greek' ); return false;">Ελληνικά (griego)</a>
        <a class="popup_menu_item tight" href="?l=french" onclick="ChangeLanguage( 'french' ); return false;">Français (francés)</a>
        <a class="popup_menu_item tight" href="?l=italian" onclick="ChangeLanguage( 'italian' ); return false;">Italiano</a>
        <a class="popup_menu_item tight" href="?l=indonesian" onclick="ChangeLanguage( 'indonesian' ); return false;">Bahasa Indonesia (indonesio)</a>
        <a class="popup_menu_item tight" href="?l=hungarian" onclick="ChangeLanguage( 'hungarian' ); return false;">Magyar (húngaro)</a>
        <a class="popup_menu_item tight" href="?l=dutch" onclick="ChangeLanguage( 'dutch' ); return false;">Nederlands (holandés)</a>
        <a class="popup_menu_item tight" href="?l=norwegian" onclick="ChangeLanguage( 'norwegian' ); return false;">Norsk (noruego)</a>
        <a class="popup_menu_item tight" href="?l=polish" onclick="ChangeLanguage( 'polish' ); return false;">Polski (polaco)</a>
        <a class="popup_menu_item tight" href="?l=portuguese" onclick="ChangeLanguage( 'portuguese' ); return false;">Português (Portugués de Portugal)</a>
        <a class="popup_menu_item tight" href="?l=brazilian" onclick="ChangeLanguage( 'brazilian' ); return false;">Português-Brasil (portugués de Brasil)</a>
        <a class="popup_menu_item tight" href="?l=romanian" onclick="ChangeLanguage( 'romanian' ); return false;">Română (rumano)</a>
        <a class="popup_menu_item tight" href="?l=russian" onclick="ChangeLanguage( 'russian' ); return false;">Русский (ruso)</a>
        <a class="popup_menu_item tight" href="?l=finnish" onclick="ChangeLanguage( 'finnish' ); return false;">Suomi (finés)</a>
        <a class="popup_menu_item tight" href="?l=swedish" onclick="ChangeLanguage( 'swedish' ); return false;">Svenska (sueco)</a>
        <a class="popup_menu_item tight" href="?l=turkish" onclick="ChangeLanguage( 'turkish' ); return false;">Türkçe (turco)</a>
        <a class="popup_menu_item tight" href="?l=vietnamese" onclick="ChangeLanguage( 'vietnamese' ); return false;">Tiếng Việt (vietnamita)</a>
        <a class="popup_menu_item tight" href="?l=ukrainian" onclick="ChangeLanguage( 'ukrainian' ); return false;">Українська (ucraniano)</a>
        <a class="popup_menu_item tight" href="https://www.valvesoftware.com/en/contact?contact-person=Translation%20Team%20Feedback" target="_blank">Comunicar un error de traducción</a>
      </div>
    `;

    if (isAuthenticated) {
      languagePulldown.style.display = "none";
      languageDropdownAccount.innerHTML = lenguageHTML;
      const currentText = globalActionMenu.innerHTML;
      const newText = currentText.replace(/&nbsp;\|\&nbsp;/g, "");
      globalActionMenu.innerHTML = newText;
    } else {
      lenguageDropdown.innerHTML = lenguageHTML;
    }

    const notificationsBtn = document.getElementById(
      "green_envelope_menu_root"
    );

    notificationsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleNotificationsMenu();
    });

    function toggleNotificationsMenu() {
      const notificationsMenu = document.getElementById("notifications_menu");
      if (notificationsMenu) {
        document.body.removeChild(notificationsMenu);
      } else {
        addNotificationsMenu();
      }
    }

    function closeNotificationsMenu() {
      const notificationsMenu = document.getElementById("notifications_menu");
      if (notificationsMenu) {
        document.body.removeChild(notificationsMenu);
      }
    }

    document.addEventListener("click", closeNotificationsMenu);
    document.addEventListener("scroll", closeNotificationsMenu);
  }

  function addMobileHeader() {
    const headerSlotMobile = document.querySelector(".HeaderSlotMobile");
    const headerContainerMobile = document.createElement("div");
    headerContainerMobile.classList.add("responsive_header");

    const hamburgerIcon = document.createElement("div");
    hamburgerIcon.id = "responsive_menu_logo";

    headerContainerMobile.appendChild(hamburgerIcon);

    headerContainerMobile.innerHTML = `
    <div class="responsive_header_content">
      ${
        currentPath === "/login" || currentPath === "/join"
          ? ""
          : `<div id="responsive_menu_logo"><img src="https://megagames.onrender.com/static/store/images/icons/header_menu_hamburger.webp" height="100%" /></div>`
      }
      <div id="responsive_header_title">
        <div class="responsive_header_logo">
          <a href="/">
            <div id="responsive_header_logo">
              <img src="/static/store/images/mega-games-logo.svg" height="36" alt="Mega Games" />
              <span class="grotesk ps-2 fs-6 text-white">Mega Games</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  `;

    headerSlotMobile.appendChild(headerContainerMobile);
  }

  function addDesktopNavbar() {
    const navbarSlot = document.querySelector(".NavbarSlotDesktop");
    const navbarContainer = document.createElement("div");
    navbarContainer.id = "responsive_store_nav_desktop";
    navbarContainer.classList.add("container");
    navbarContainer.style.position = "absolute";
    navbarContainer.style.left = "0";
    navbarContainer.style.right = "0";

    navbarContainer.innerHTML = `
      <div class="home_page_content container" style="position: absolute; left: 0; right: 0">
        <div class="responsive_store_nav_ctn_spacer">
          <div id="store_header" role="navigation" aria-label="Menú de la tienda" style="visibility: visible; display: block">
            <div class="content">
              <div id="store_controls">
                <div id="cart_status_data" class="cart_status_flex">
                  <div class="store_header_btn_gray store_header_btn">
                    <div class="store_header_btn_caps store_header_btn_leftcap"></div>
                    <div class="store_header_btn_caps store_header_btn_rightcap"></div>
                    <a
                      id="wishlist_link"
                      class="store_header_btn_content"
                      href="#"
                    >
                      Lista de deseados (<span id="wishlist_item_count_value"></span>)
                    </a>
                  </div>
                  <div data-featuretarget="shoppingcart-count-widget" data-props="{}">
                    <div class="cart_control">
                      <a class="cart_link" href="/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none" class="cart_icon">
                          <path d="M33.63 8.05005L30.11 20.81C29.9416 21.453 29.5645 22.0219 29.0378 22.4273C28.5111 22.8328 27.8647 23.0518 27.2 23.05H14.75C14.1022 23.0507 13.4715 22.8416 12.9524 22.4541C12.4333 22.0665 12.0536 21.5213 11.87 20.9L7.56 8.05005H2V4.05005H8.28C8.90845 4.05122 9.52067 4.24973 10.0302 4.61755C10.5398 4.98538 10.921 5.50394 11.12 6.10005L11.78 8.10005L33.63 8.05005ZM15 27.05C14.5055 27.05 14.0222 27.1967 13.6111 27.4714C13.2 27.7461 12.8795 28.1365 12.6903 28.5933C12.5011 29.0502 12.4516 29.5528 12.548 30.0378C12.6445 30.5227 12.8826 30.9682 13.2322 31.3178C13.5819 31.6674 14.0273 31.9056 14.5123 32.002C14.9972 32.0985 15.4999 32.049 15.9567 31.8597C16.4135 31.6705 16.804 31.3501 17.0787 30.939C17.3534 30.5278 17.5 30.0445 17.5 29.55C17.5 28.887 17.2366 28.2511 16.7678 27.7823C16.2989 27.3134 15.663 27.05 15 27.05ZM27 27.05C26.5055 27.05 26.0222 27.1967 25.6111 27.4714C25.2 27.7461 24.8795 28.1365 24.6903 28.5933C24.5011 29.0502 24.4516 29.5528 24.548 30.0378C24.6445 30.5227 24.8826 30.9682 25.2322 31.3178C25.5819 31.6674 26.0273 31.9056 26.5123 32.002C26.9972 32.0985 27.4999 32.049 27.9567 31.8597C28.4135 31.6705 28.804 31.3501 29.0787 30.939C29.3534 30.5278 29.5 30.0445 29.5 29.55C29.5 28.887 29.2366 28.2511 28.7678 27.7823C28.2989 27.3134 27.663 27.05 27 27.05Z" fill="currentColor"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <nav id="store_nav_area">
                <div class="store_nav_bg nav-bg">
                  <div class="store_nav">
                    <div id="foryou_tab" data-flyout="foryou_flyout" class="tab">
                      <span class="pulldown">
                        <a class="pulldown_desktop" href="/">Tu tienda</a>
                        <a class="pulldown_mobile" href="/">Tu tienda</a>
                      </span>
                    </div>
                    <div id="foryou_flyout" class="popup_block_new responsive_slidedown" style="visibility: visible; top: 42px; left: 0px; display: none; opacity: 0">
                      <div class="popup_body popup_menu popup_menu_browse">
                        <a href="/" class="popup_menu_item">Inicio</a>
                        <a href="#" class="popup_menu_item">Recomendaciones</a>
                        <a href="#" class="popup_menu_item">Vistos recientemente</a>
                      </div>
                    </div>
                    <div id="noteworthy_tab" data-flyout="noteworthy_flyout" class="tab">
                      <span class="pulldown">
                        <a href="javascript:void(0)" class="pulldown_desktop">Nuevo y destacable</a>
                        <a href="javascript:void(0)" class="pulldown_mobile">Nuevo y destacable</a>
                      </span>
                    </div>
                    <div id="noteworthy_flyout" class="popup_block_new" style="visibility: visible; top: 42px; left: 83px; display: none; opacity: 0">
                      <div class="popup_body popup_menu_twocol_new">
                        <div class="popup_menu popup_menu_browse">
                          <div class="popup_menu_subheader responsive_hidden">Populares</div>
                          <a href="/juegos-populares" class="popup_menu_item">Lo más vendido</a>
                          <a href="/juegos-populares" class="popup_menu_item">Lo más jugado</a>
                          <div class="category_hr responsive_hidden"></div>
                          <a href="#" class="popup_menu_item">Novedades</a>
                          <a href="#" class="popup_menu_item">Próximos lanzamientos</a>
                        </div>
                        <div class="popup_menu popup_menu_browse leftborder">
                          <div class="popup_menu_subheader responsive_hidden">Promociones y eventos</div>
                          <a href="/ofertas-especiales" class="popup_menu_item">Ofertas especiales</a>
                          <a href="/ActivisionPublisherSale2024" class="popup_menu_item">Eventos de rebajas</a>
                        </div>
                      </div>
                    </div>
                    <div id="genre_tab" data-flyout="genre_flyout" class="tab">
                      <span class="pulldown">
                        <a href="javascript:void(0)" class="pulldown_desktop">Categorías</a>
                        <a href="javascript:void(0)" class="pulldown_mobile">Categorías</a>
                      </span>
                    </div>
                    <div id="genre_flyout" class="popup_block_new" style="visibility: visible; top: 42px; left: 232px; display: none; opacity: 0">
                      <div class="popup_body popup_menu_twocol_new">
                        <div class="popup_menu popup_menu_browse">
                          <div class="popup_menu_subheader responsive_hidden">Miscelánea</div>
                          <a href="#" class="popup_menu_item">Todas las ofertas</a>
                          <div class="category_hr responsive_hidden"></div>
                          <a href="/tienda" class="popup_menu_item">Juegos</a>
                          <a href="/juegos-y-tarjetas" class="popup_menu_item">Juegos y tarjetas</a>
                          <a href="#" class="popup_menu_item">eTarjetas</a>
                          <div class="category_hr responsive_hidden"></div>
                          <a href="#" class="popup_menu_item">Xbox</a>
                          <a href="#" class="popup_menu_item">PSN</a>
                          <a href="#" class="popup_menu_item">Nintendo</a>
                        </div>
                        <div class="popup_menu popup_menu_browse leftborder">
                          <div class="popup_menu_subheader reduced_vspace">Géneros</div>
                          <div class="popup_menu_subheader popup_genre_expand_header responsive_hidden">
                            <a href="#" class="popup_menu_item">Acción</a>
                          </div>
                          <a href="#" class="popup_menu_item">Aventuras</a>
                          <a href="#" class="popup_menu_item">Arcade</a>
                          <a href="#" class="popup_menu_item">Carreras</a>
                          <a href="#" class="popup_menu_item">Disparos en primera persona</a>
                          <a href="#" class="popup_menu_item">Disparos en tercera persona</a>
                        </div>
                        <div class="popup_menu popup_menu_browse">
                          <div class="popup_menu_subheader reduced_vspace responsive_hidden"><br /></div>
                          <div class="popup_menu_subheader popup_genre_expand_header responsive_hidden">
                            <a href="#" class="popup_menu_item">Rol</a>
                          </div>
                          <div class="popup_genre_expand_content responsive_hidden">
                            <a href="#" class="popup_menu_item">Deporte</a>
                            <a href="#" class="popup_menu_item">Educativo</a>
                            <a href="#" class="popup_menu_item">Estrategia</a>
                            <a href="#" class="popup_menu_item">Hack and slash</a>
                            <a href="#" class="popup_menu_item">Indie</a>
                            <a href="#" class="popup_menu_item">Lucha</a>
                          </div>
                        </div>
                        <div class="popup_menu popup_menu_browse">
                          <div class="popup_menu_subheader reduced_vspace responsive_hidden"><br /></div>
                          <div class="popup_menu_subheader popup_genre_expand_header responsive_hidden">
                            <a href="#" class="popup_menu_item">Multijugador masivo en línea</a>
                          </div>
                          <div class="popup_genre_expand_content responsive_hidden">
                            <a href="#" class="popup_menu_item">Música</a>
                            <a href="#" class="popup_menu_item">Plataforma</a>
                            <a href="#" class="popup_menu_item">Point and click</a>
                            <a href="#" class="popup_menu_item">Rompecabezas</a>
                            <a href="#" class="popup_menu_item">Simulación</a>
                          </div>
                        </div>
                        <div class="popup_menu popup_menu_browse leftborder"><div class="ps-4"></div></div>
                      </div>
                    </div>
                    <div class="search_area">
                      <div id="store_search">
                        <form name="searchform" role="search">
                          <div class="searchbox">
                            <input id="searchInput" class="store_nav_search_term default" type="search" placeholder="buscar" size="22" autocomplete="off" maxlength="64" />
                            <a id="store_search_link" class="store_search_link text-w" aria-label="Buscar en Mega Games"><i class="fa-solid fa-magnifying-glass fa"></i></a>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div id="searchterm_options" class="search_suggest popup_block_search" style="opacity: 1; display: none">
                      <div class="popup_body search_v2" style="border-top: none">
                        <div id="search_suggestion_contents"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    `;

    if (navbarSlot) {
      navbarSlot.appendChild(navbarContainer);

      const wishlistLink = document.getElementById("wishlist_link");
      if (wishlistLink) {
        wishlistLink.href = `/wishlist/${username}/`;
      }

      const wishlistItemCount = window.userContext.wishlistCount;
      const wishlistItemCountElement = document.getElementById(
        "wishlist_item_count_value"
      );
      if (wishlistItemCountElement) {
        wishlistItemCountElement.textContent = wishlistItemCount;
      }
      addSearchEvents();
    }
  }

  function addMobileNavbar() {
    const navbarSlot = document.querySelector(".NavbarSlotMobile");
    const navbarContainer = document.createElement("div");
    navbarContainer.id = "responsive_store_nav_mobile";

    navbarContainer.innerHTML = `
      <div id="store_header" role="navigation" aria-label="Menú de la tienda" style="visibility: visible; display: block">
        <div class="content">
          <div id="store_nav_area">
            <div class="store_nav_bg nav-bg">
              <div class="store_nav">
                <div id="foryou_tab" data-flyout="foryou_flyout" class="tab">
                  <span class="pulldown">
                    <a class="pulldown_desktop" href="javascript:void(0)">Tu tienda</a>
                    <a class="pulldown_mobile" href="javascript:void(0)">Tu tienda</a>
                  </span>
                </div>
                <div id="foryou_flyout" class="popup_block_new responsive_slidedown sub_menu" data-tab="foryou_tab" style="height: 0px">
                  <div class="popup_body popup_menu popup_menu_browse">
                    <a href="/" class="popup_menu_item">Inicio</a>
                    <a href="#" class="popup_menu_item">Recomendaciones</a>
                    <a href="#" class="popup_menu_item">Vistos recientemente</a>
                  </div>
                </div>
                <div id="noteworthy_tab" data-flyout="noteworthy_flyout" class="tab">
                  <span class="pulldown">
                    <a href="javascript:void(0)" class="pulldown_desktop">Nuevo y destacable</a>
                    <a href="javascript:void(0)" class="pulldown_mobile">Nuevo y destacable</a>
                  </span>
                </div>
                <div id="noteworthy_flyout" class="popup_block_new responsive_slidedown sub_menu" data-tab="noteworthy_tab" style="height: 0px">
                  <div class="popup_body popup_menu_twocol_new">
                    <div class="popup_menu popup_menu_browse">
                      <div class="popup_menu_subheader responsive_hidden">Populares</div>
                      <a href="/juegos-populares" class="popup_menu_item">Lo más vendido</a>
                      <a href="/juegos-populares" class="popup_menu_item">Lo más jugado</a>
                      <div class="category_hr responsive_hidden"></div>
                      <a href="#" class="popup_menu_item">Novedades</a>
                      <a href="#" class="popup_menu_item">Próximos lanzamientos</a>
                    </div>
                    <div class="popup_menu popup_menu_browse leftborder">
                      <div class="popup_menu_subheader responsive_hidden">Promociones y eventos</div>
                      <a href="/ofertas-especiales" class="popup_menu_item">Ofertas especiales</a>
                      <a href="/ActivisionPublisherSale2024" class="popup_menu_item">Eventos de rebajas</a>
                    </div>
                  </div>
                </div>
                <div id="genre_tab" data-flyout="genre_flyout" class="tab">
                  <span class="pulldown">
                    <a href="javascript:void(0)" class="pulldown_desktop">Categorías</a>
                    <a href="javascript:void(0)" class="pulldown_mobile">Categorías</a>
                  </span>
                </div>
                <div id="genre_flyout" class="popup_block_new responsive_slidedown sub_menu" data-tab="genre_tab" style="height: 0px">
                  <div class="popup_body popup_menu_twocol_new">
                    <div class="popup_menu popup_menu_browse">
                      <div class="popup_menu_subheader responsive_hidden">Miscelánea</div>
                      <a href="#" class="popup_menu_item">Todas las ofertas</a>
                      <div class="category_hr responsive_hidden"></div>
                      <a href="/tienda" class="popup_menu_item">Juegos</a>
                      <a href="/juegos-y-tarjetas" class="popup_menu_item">Juegos y tarjetas</a>
                      <a href="#" class="popup_menu_item">eTarjetas</a>
                      <div class="category_hr responsive_hidden"></div>
                      <a href="#" class="popup_menu_item">Xbox</a>
                      <a href="#" class="popup_menu_item">PSN</a>
                      <a href="#" class="popup_menu_item">Nintendo</a>
                    </div>
                    <div class="popup_menu popup_menu_browse leftborder">
                      <div class="popup_menu_subheader reduced_vspace">Géneros</div>
                      <div class="popup_menu_subheader popup_genre_expand_header responsive_hidden">
                        <a href="#" class="popup_menu_item">Acción</a>
                      </div>
                      <a href="#" class="popup_menu_item">Acción</a>
                      <a href="#" class="popup_menu_item">Aventuras</a>
                      <a href="#" class="popup_menu_item">Carreras</a>
                      <a href="#" class="popup_menu_item">Estrategia</a>
                      <a href="#" class="popup_menu_item">Disparos en primera persona</a>
                      <a href="#" class="popup_menu_item">Disparos en tercera persona</a>
                      <a href="#" class="popup_menu_item">Multijugador masivo en línea</a>
                      <a href="#" class="popup_menu_item">Simulación</a>
                    </div>
                    <div class="popup_menu popup_menu_browse">
                      <div class="popup_menu_subheader reduced_vspace responsive_hidden"><br /></div>
                      <div class="popup_menu_subheader popup_genre_expand_header responsive_hidden">
                        <a href="#" class="popup_menu_item">Rol</a>
                      </div>
                      <div class="popup_genre_expand_content responsive_hidden">
                        <a href="#" class="popup_menu_item">Deporte</a>
                        <a href="#" class="popup_menu_item">Educativo</a>
                        <a href="#" class="popup_menu_item">Estrategia</a>
                        <a href="#" class="popup_menu_item">Hack and slash</a>
                        <a href="#" class="popup_menu_item">Indie</a>
                        <a href="#" class="popup_menu_item">Lucha</a>
                      </div>
                    </div>
                    <div class="popup_menu popup_menu_browse">
                      <div class="popup_menu_subheader reduced_vspace responsive_hidden"><br /></div>
                      <div class="popup_menu_subheader popup_genre_expand_header responsive_hidden">
                        <a href="#" class="popup_menu_item">Multijugador masivo en línea</a>
                      </div>
                      <div class="popup_genre_expand_content responsive_hidden">
                        <a href="#" class="popup_menu_item">Música</a>
                        <a href="#" class="popup_menu_item">Plataforma</a>
                        <a href="#" class="popup_menu_item">Point and click</a>
                        <a href="#" class="popup_menu_item">Rompecabezas</a>
                        <a href="#" class="popup_menu_item">Simulación</a>
                      </div>
                    </div>
                    <div class="popup_menu popup_menu_browse leftborder"><div class="ps-4"></div></div>
                  </div>
                </div>
                <div class="search_area">
                  <div id="store_search">
                    <form name="searchform" role="search">
                      <div class="searchbox">
                        <input id="searchInput" class="store_nav_search_term default" type="search" placeholder="buscar" size="22" autocomplete="off" maxlength="64" />
                        <a id="store_search_link" class="store_search_link text-w" aria-label="Buscar en Mega Games"><i class="fa-solid fa-magnifying-glass fa"></i></a>
                      </div>
                    </form>
                  </div>
                  <div id="searchterm_options" class="search_suggest popup_block_search" style="opacity: 1; display: none">
                  <div class="popup_body search_v2" style="border-top: none">
                    <div id="search_suggestion_contents"></div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    navbarSlot.appendChild(navbarContainer);

    addSearchEvents();
  }

  const isPWA = window.matchMedia("(display-mode: standalone)").matches;

  function addPWANavbar() {
    if (isPWA) {
      const navbarContent = `
          <div class="bottom_navbar_pwa">
              <nav class="bottom_nav">
                  <a href="/" class="pwa_nav_item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.83 12.99L11.83 2H2v9.83l10.99 10.99zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4S7 4.67 7 5.5S6.33 7 5.5 7"/>
                    </svg>
                  </a>
                  <a href="/ofertas-especiales" class="pwa_nav_item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M9.19 6.35c-2.04 2.29-3.44 5.58-3.57 5.89L2 10.69l4.81-4.81zM11.17 17s3.74-1.55 5.89-3.7c5.4-5.4 4.5-9.62 4.21-10.57c-.95-.3-5.17-1.19-10.57 4.21C8.55 9.09 7 12.83 7 12.83zm6.48-2.19c-2.29 2.04-5.58 3.44-5.89 3.57L13.31 22l4.81-4.81zM9 18c0 .83-.34 1.58-.88 2.12C6.94 21.3 2 22 2 22s.7-4.94 1.88-6.12A2.996 2.996 0 0 1 9 18m4-9c0-1.1.9-2 2-2s2 .9 2 2s-.9 2-2 2s-2-.9-2-2"/>
                    </svg>
                  </a>
                  <a href="/ActivisionPublisherSale2024" class="pwa_nav_item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 16q1.2 0 2.138-.712T15.5 13.45h-7q.425 1.125 1.363 1.838T12 16m-2.5-4q.625 0 1.063-.437T11 10.5t-.437-1.062T9.5 9t-1.062.438T8 10.5t.438 1.063T9.5 12m5 0q.625 0 1.063-.437T16 10.5t-.437-1.062T14.5 9t-1.062.438T13 10.5t.438 1.063T14.5 12M7.625 6.4L12 .725L16.375 6.4l6.85 2.3l-4.325 6.125l.175 6.825L12 19.675L4.925 21.65L5.1 14.8L.8 8.7z"/>
                    </svg>
                  </a>
                  <a href="/profiles/notifications" class="pwa_nav_item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M5 19q-.425 0-.712-.288T4 18t.288-.712T5 17h1v-7q0-2.075 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062T12 2t1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h1q.425 0 .713.288T20 18t-.288.713T19 19zm7 3q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22"/>
                    </svg>
                  </a>
                  <a href="/cart" class="pwa_nav_item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                      <g fill="none">
                        <path fill="currentColor" d="M18 15H7L5.5 6H21z"/>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.5 3m0 0L7 15h11l3-9z"/>
                        <circle cx="8" cy="20" r="1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        <circle cx="17" cy="20" r="1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                      </g>
                    </svg>
                  </a>
              </nav>
          </div>
      `;

      const navbarSlot = document.querySelector(".NavbarSlotPWA");
      navbarSlot.innerHTML = navbarContent;

      const currentPath = window.location.pathname;
      const navItems = document.querySelectorAll(".bottom_nav .pwa_nav_item");
      let isActive = false;

      navItems.forEach((item) => {
        const itemPath = new URL(item.href, window.location.origin).pathname;
        if (itemPath === currentPath) {
          item.classList.add("active");
          isActive = true;
        }
      });

      if (!isActive) {
        navItems[0].classList.add("active");
      }
    }
  }

  function generateFooterColumn(title, items) {
    return `
        <ul>
          <span class="footer_nav_title">${title}</span>
          ${items
            .map(
              (item) => `
            <li>
              <a href="${item.href}" class="footer_nav_link">${item.text}</a>
            </li>
          `
            )
            .join("")}
        </ul>
    `;
  }

  function addFooter() {
    const footerSlot = document.querySelector(".FooterSlot");
    if (!isPWA) {
      let footerContainer = "";
      footerContainer = `
        <footer id="footer" class="footer_page">
          <div class="footer_payment">
            <ul>
              <li><img src="https://megagames.onrender.com/static/store/images/payments/wallet.svg" alt="" loading="lazy"></li>
              <li><img src="https://megagames.onrender.com/static/store/images/payments/logo_steam_footer.png" alt="" loading="lazy"></li>
              <li><img src="https://megagames.onrender.com/static/store/images/payments/dlocal_webpay.svg" alt="" loading="lazy"></li>
              <li><img src="https://megagames.onrender.com/static/store/images/payments/braintree_paypal.svg" alt="" loading="lazy"></li>
              <li><img src="https://megagames.onrender.com/static/store/images/payments/dlocal_credit_card.svg" alt="" loading="lazy"></li>
              <li><img src="https://megagames.onrender.com/static/store/images/payments/ebanx_servipag_voucher.svg" alt="" loading="lazy"></li>
              <li><img src="https://megagames.onrender.com/static/store/images/payments/ebanx_sencillito_voucher.svg" alt="" loading="lazy"></li>
              <li><img src="https://megagames.onrender.com/static/store/images/payments/ebanx_multicaja_voucher.svg" alt="" loading="lazy"></li>
              <li><img src="https://megagames.onrender.com/static/store/images/payments/ebanx_machpay_wallet.svg" alt="" loading="lazy"></li>
              <li><img src="https://megagames.onrender.com/static/store/images/payments/boa_cl_transfer.svg" alt="" loading="lazy"></li>
              <li><img src="https://megagames.onrender.com/static/store/images/payments/nuvei_crypto.svg" alt="" loading="lazy"></li>
            </ul>
          </div>
          <div class="footer_page_ctn">
            <div class="footer_content">
              ${generateFooterColumn("Sobre Mega Games", [
                { text: "Sobre nosotros", href: "#" },
                { text: "Contáctanos", href: "#" },
                { text: "Vacantes", href: "#" },
              ])}
              ${generateFooterColumn("Comprar", [
                { text: "Cómo comprar", href: "#" },
                { text: "Lista de juegos", href: "#" },
                { text: "Colecciones", href: "#" },
                { text: "Programa de fidelidad", href: "#" },
              ])}
              ${generateFooterColumn("Ayuda", [
                { text: "Preguntas frecuentes", href: "#" },
                { text: "Cómo activar tus juegos", href: "#" },
                { text: "Crear un ticket", href: "#" },
                { text: "Política de devoluciones", href: "#" },
              ])}
              ${generateFooterColumn("Comunidad", [
                { text: "Blog", href: "#" },
                { text: "Sorteos", href: "#" },
                { text: "Conviértete en afiliado", href: "#" },
              ])}
              <ul>
               <li>
                <span class="footer_nav_title">Negocios</span>
               <li>
                <a href="" class="footer_btn">
                  <span>Vende en Mega Games</span>
                </a>
              </ul>
              <ul>
                <div class="app-badge">
                  <span class="footer_nav_title">Descarga la app</span>
                  <div class="about_install_wrapper">
                    <div class="about_install android">
                      <button id="installAppFooter" type="button">
                        Mega Games
                      </button>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
            <div class="footer_form">
              <div class="footer_form_ctn">
                <div>Obtén ofertas personalizadas de videojuegos</div>
                <form>
                  <input id="newsletter1" aria-label="Ingresa tu email" required type="email" placeholder="Ingresa tu email" autocorrect="off"/>
                  <button type="submit">Suscribirse</button>
                </form>
                <p>Puedes darte de baja en cualquier momento. Visita el apartado <a href="#">Aviso de Privacidad</a> para más información</p>
              </div>
            </div>
            <div class="footer_bottom">
              <p>© 2024 Mega Games Store. Página creada con fines didácticos e inspirada en Steam y Eneba. No tiene relación oficial con estas marcas. Las imágenes utilizadas son para prácticas educativas. Nombres y marcas mencionados son propiedad de sus respectivos dueños.
                <a href="#">Términos y condiciones</a>
                |
                <a href="#">Aviso de privacidad</a>
                |
                <a href="#">Reembolsos</a>
              </p>
              <div class="social_footer_links">
                <a class="footer_link" href="https://www.instagram.com/" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" preserveAspectRatio="xMidYMid" viewBox="0 0 256 256">
                    <path fill="currentColor" d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Zm6.296 5.618c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm4.32 7.188c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z"
                  ></path>
                </svg>
                </a>
                <a class="footer_link" href="https://twitter.com/" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 1200 1227">
                    <path fill="currentColor" d="M714.163 519.284 1160.89 0h-105.86L667.137 450.887 357.328 0H0l468.492 681.821L0 1226.37h105.866l409.625-476.152 327.181 476.152H1200L714.137 519.284h.026ZM569.165 687.828l-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721H892.476L569.165 687.854v-.026Z"></path>
                  </svg>
                </a>
                <a class="footer_link" href="https://github.com/Ktumsh/mega-games-django" target="_blank">
                  <svg viewBox="0 0 256 250" width="21" height="21" fill="currentColor" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                    <path d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      `;

      footerSlot.innerHTML = footerContainer;

      let defPrompt;

      window.addEventListener("beforeinstallprompt", (e) => {
        defPrompt = e;
      });

      document
        .getElementById("installAppFooter")
        .addEventListener("click", () => {
          if (defPrompt) {
            defPrompt.prompt();
            defPrompt = null;
          } else {
            alert("Aplicación ya instalada.");
          }
        });
    }
  }

  function removeHamburgerMenu() {
    const hamburgerMenu = document.querySelector(".HamburgerMenuSlot");
    if (hamburgerMenu) {
      hamburgerMenu.innerHTML = "";
    }
  }

  function removeDesktopNavbar() {
    const desktopNavbar = document.getElementById(
      "responsive_store_nav_desktop"
    );
    if (desktopNavbar) {
      desktopNavbar.remove();
    }
  }

  function removeMobileNavbar() {
    const mobileNavbar = document.getElementById("responsive_store_nav_mobile");
    if (mobileNavbar) {
      mobileNavbar.remove();
    }
  }

  function removeFooter() {
    const footerSlot = document.querySelector(".FooterSlot");
    if (footerSlot) {
      footerSlot.innerHTML = "";
    }
  }

  function addDesktopNavbarEventListeners() {
    document.querySelectorAll(".tab").forEach((tab) => {
      const flyoutId = tab.dataset.flyout;
      tab.addEventListener("mouseenter", () => {
        hideAllMenus();
        currentMenuId = tab.id;
        currentMenuTimeoutId = setTimeout(() => {
          showMenuWithOpacity(tab.id, flyoutId);
        }, 300);
      });
      tab.addEventListener("mouseleave", () => {
        clearTimeout(currentMenuTimeoutId);
      });
    });

    document.querySelectorAll(".popup_block_new").forEach((flyout) => {
      flyout.addEventListener("mouseenter", () => {
        currentMenuIsMouseOverMenu = true;
      });
      flyout.addEventListener("mouseleave", () => {
        currentMenuIsMouseOverMenu = false;
        hideMenuWithOpacity(flyout.dataset.tab, flyout.id);
      });
    });
  }

  function addMobileNavbarEventListeners() {
    const menuItems = document.querySelectorAll(".tab");
    menuItems.forEach(function (item) {
      item.addEventListener("click", function () {
        const flyoutId = this.dataset.flyout;
        const flyout = document.getElementById(flyoutId);
        const isOpen =
          flyout.style.height === "0px" || flyout.style.height === "";
        if (isOpen) {
          flyout.style.height = flyout.scrollHeight + "px";
        } else {
          flyout.style.height = "0";
        }
      });
    });
  }

  function addMenuEventListeners() {
    let touchStartX = 0;
    let touchEndX = 0;
    const hamburgerMenuSlot = document.querySelector(".HamburgerMenuSlot");
    const hamburgerMenuOpenBtn = document.getElementById(
      "responsive_menu_logo"
    );
    const overlayBg = document.querySelector(".overlay_menu_bg");
    const body = document.querySelector("body");
    const headerTitle = document.getElementById("responsive_header_title");
    const swipeAreaWidth = 20;
    const superNavActive = document.querySelector(".supernav_active");
    const subMenu = document.querySelector(".menuitem_submenu_wrapper");

    overlayBg.addEventListener("click", closeMenu);
    if (hamburgerMenuOpenBtn) {
      hamburgerMenuOpenBtn.addEventListener("click", toggleMenu);
    }

    superNavActive.addEventListener("click", () => {
      superNavActive.classList.toggle("submenu_active");
      subMenu.classList.toggle("active");
      if (superNavActive.classList.contains("submenu_active")) {
        subMenu.style.height = subMenu.scrollHeight + "px";
      } else {
        subMenu.style.height = "0px";
      }
    });

    document.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      if (touchEndX < touchStartX - 20) {
        closeMenu();
      } else if (
        touchEndX > touchStartX + 20 &&
        touchStartX <= swipeAreaWidth
      ) {
        openMenu();
      }
    }

    function openMenu() {
      if (!hamburgerMenuSlot.classList.contains("mainmenu_active")) {
        toggleMenu();
      }
    }

    function closeMenu() {
      if (hamburgerMenuSlot.classList.contains("mainmenu_active")) {
        hamburgerMenuOpenBtn.classList.remove("chevron");
        if (hamburgerMenuOpenBtn.classList.contains("chevron")) {
          hamburgerMenuOpenBtn.innerHTML = "";
        } else {
          hamburgerMenuOpenBtn.innerHTML = `<img src="https://megagames.onrender.com/static/store/images/icons/header_menu_hamburger.webp" height="100%" />`;
        }
        hamburgerMenuSlot.classList.remove("mainmenu_active");
        headerTitle.innerHTML = `
      <div class="responsive_header_logo">
        <a href="/">
          <div id="responsive_header_logo">
            <img src="/static/store/images/mega-games-logo.svg" height="36" alt="Mega Games" />
            <span class="grotesk ps-2 fs-6 text-white">Mega Games</span>
          </div>
        </a>
      </div>
    `;
        overlayBg.classList.remove("open");
        body.classList.remove("hidden_body");
      }
    }

    function toggleMenu() {
      hamburgerMenuOpenBtn.classList.toggle("chevron");
      if (hamburgerMenuOpenBtn.classList.contains("chevron")) {
        hamburgerMenuOpenBtn.innerHTML = "";
      } else {
        hamburgerMenuOpenBtn.innerHTML = `<img src="https://megagames.onrender.com/static/store/images/icons/header_menu_hamburger.webp" height="100%" />`;
      }
      hamburgerMenuSlot.classList.toggle("mainmenu_active");
      if (hamburgerMenuSlot.classList.contains("mainmenu_active")) {
        headerTitle.innerHTML = `<div class="responsive_menu_title">Menú</div>`;
        overlayBg.classList.add("open");
      } else {
        headerTitle.innerHTML = `
        <div class="responsive_header_logo">
          <a href="/">
            <div id="responsive_header_logo">
              <img src="/static/store/images/mega-games-logo.svg" height="36" alt="Mega Games" />
              <span class="grotesk ps-2 fs-6 text-white">Mega Games</span>
            </div>
          </a>
        </div>
      `;
        overlayBg.classList.remove("open");
      }
      body.classList.toggle("hidden_body");
    }

    const menuUserArea = document.getElementById("menu_user_area");
    const userName = document.getElementById("user_name");
    const hamburgerSessionLink = document.getElementById(
      "hamburger_session_link"
    );
    const hamburgerLogoutLink = document.getElementById("logout");
    const supernavMenu = document.querySelectorAll(".isLogged");

    if (isAuthenticated) {
      hamburgerSessionLink.style.display = "none";
      userName.textContent = username;
      menuUserArea.style.display = "block";
      hamburgerLogoutLink.style.display = "flex";
    } else {
      menuUserArea.style.display = "none";
      hamburgerSessionLink.style.display = "flex";
      hamburgerLogoutLink.style.display = "none";
      supernavMenu.forEach((menu) => {
        menu.style.display = "none";
      });
    }
  }

  function screenSizeChange(mq) {
    const pathsToRemoveNavbar = [
      "/login/",
      "/signup/",
      "/community/",
      "/about/",
      "/help/",
      "/profiles/notifications/",
      `/profile/${username}/`,
      "/account/history/",
    ];

    if (pathsToRemoveNavbar.includes(currentPath)) {
      removeDesktopNavbar();
      removeMobileNavbar();

      if (isAuthenticated) {
        if (mq.matches) {
          addHamburgerMenu();
          addPWANavbar();
          addMenuEventListeners();
        } else {
          removeHamburgerMenu();
        }
      } else {
        addHamburgerMenu();
        addMenuEventListeners();
      }
    } else {
      if (isAuthenticated) {
        if (mq.matches) {
          removeDesktopNavbar();
          addHamburgerMenu();
          addMobileNavbar();
          addPWANavbar();
          addMenuEventListeners();
          addMobileNavbarEventListeners();
          updateCartCount();
        } else {
          removeHamburgerMenu();
          removeMobileNavbar();
          addDesktopNavbar();
          addDesktopNavbarEventListeners();
          updateCartCount();
        }
      }
    }
    removeFooter();
    addFooter();
  }
  addDesktopHeader();
  addMobileHeader();

  const mobileMediaQuery = window.matchMedia("(max-width: 910px)");

  screenSizeChange(mobileMediaQuery);
  mobileMediaQuery.addEventListener("change", () =>
    screenSizeChange(mobileMediaQuery)
  );

  const footerSlot = document.querySelector(".FooterSlot");
  const footerContainer = document.createElement("div");

  if (isPWA) {
    footerContainer.classList.add("void_div");
    footerSlot.appendChild(footerContainer);
  }

  function updateCartCount() {
    fetch("/api/cart/count/")
      .then(async (response) => {
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(`La respuesta del servidor no es JSON: ${text}`);
        }
        return response.json();
      })
      .then((data) => {
        const cartCountElement = document.querySelector(
          "#cart_status_data .cart_link"
        );
        if (cartCountElement) {
          const svgElement = cartCountElement.querySelector("svg");

          if (svgElement) {
            if (
              svgElement.nextSibling &&
              svgElement.nextSibling.nodeType === Node.TEXT_NODE
            ) {
              svgElement.nextSibling.textContent = ` Carro (${data.totalItems})`;
            } else {
              const textNode = document.createTextNode(
                ` Carro (${data.totalItems})`
              );
              svgElement.parentNode.insertBefore(
                textNode,
                svgElement.nextSibling
              );
            }
          }
        }
      })
      .catch((error) => {
        console.error("Error al obtener la cantidad del carrito:", error);
      });
  }

  function addNotificationsMenu() {
    const notificationsMenu = document.createElement("div");
    notificationsMenu.id = "notifications_menu";
    notificationsMenu.classList.add("notifications_menu");
    notificationsMenu.style.top = "30px";
    notificationsMenu.style.right = "581px";

    notificationsMenu.innerHTML = `
      <div class="notifications_menu_ctn">
        <div class="notifications_menu_top_area">
          <div class="title_area">Notificaciones</div>
          <a href="/profiles/notifications">
            <div class="view_all">Ver todas</div>
          </a>
        </div>
        <div class="notifications_menu_body_area">
          <div class="notifications_menu_body_ctn">
            <div class="no_notifications">
              En este momento no tienes notificaciones nuevas.
            </div>
            <div class="notifications_area">
              Aquí es donde puedes ver las notificaciones de Mega Games sobre la
              lista de deseados, tus recomendaciones, el inventario, etc.
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(notificationsMenu);
  }
});

function changeOpacity(target, duration, fromOpacity, toOpacity) {
  const opacityIncrement = (toOpacity - fromOpacity) / (duration / 10);
  let currentOpacity = fromOpacity;
  target.style.opacity = currentOpacity;
  const timer = setInterval(function () {
    currentOpacity += opacityIncrement;
    currentOpacity = Math.min(Math.max(currentOpacity, 0), 1);
    target.style.opacity = currentOpacity;
    if (
      (opacityIncrement > 0 && currentOpacity >= toOpacity) ||
      (opacityIncrement < 0 && currentOpacity <= toOpacity)
    ) {
      clearInterval(timer);
    }
  }, 10);
}

let currentMenuTimeoutId;
let currentMenuIsMouseOverMenu = false;
let currentMenuId;

function hideAllMenus() {
  clearTimeout(currentMenuTimeoutId);
  document
    .querySelectorAll("#responsive_store_nav_desktop .popup_block_new")
    .forEach(function (flyout) {
      if (flyout.id !== currentMenuId) {
        changeOpacity(flyout, 150, 1, 0);
        setTimeout(function () {
          flyout.style.display = "none";
          flyout.classList.remove("open");
        }, 150);
      }
    });
  document.querySelectorAll(".tab").forEach(function (tab) {
    if (tab.id !== currentMenuId) {
      toggleTabFocusClass(tab, false);
    }
  });
}

function showMenuWithOpacity(tabId, flyoutId) {
  const tab = document.getElementById(tabId);
  const flyout = document.getElementById(flyoutId);
  if (flyout.style.display === "none" && !flyout.classList.contains("open")) {
    flyout.style.display = "block";
    requestAnimationFrame(() => {
      changeOpacity(flyout, 150, 0, 1);
      flyout.classList.add("open");
    });
    toggleTabFocusClass(tab, true);
    currentMenuIsMouseOverMenu = true;
  }
}

function hideMenuWithOpacity(tabId, flyoutId) {
  const tab = document.getElementById(tabId);
  const flyout = document.getElementById(flyoutId);
  clearTimeout(currentMenuTimeoutId);
  if (!currentMenuIsMouseOverMenu) {
    changeOpacity(flyout, 150, 1, 0);
    setTimeout(function () {
      flyout.style.display = "none";
      flyout.classList.remove("open");
    }, 150);
    if (tab) {
      toggleTabFocusClass(tab, false);
    }
  }
}

function toggleTabFocusClass(tab, isFocused) {
  if (isFocused) {
    if (!tab.classList.contains("focus")) {
      tab.classList.add("focus");
    }
  } else {
    tab.classList.remove("focus");
  }
}

function ShowMenu(menuId, alignment) {
  const menu = document.getElementById(menuId);
  menu.style[alignment] = "0";
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block";
    requestAnimationFrame(() => {
      changeOpacity(menu, 150, 0, 1);
    });
  } else {
    menu.style.display = "none";
    menu.style.opacity = "0";
  }
}

function ChangeLanguage(language) {
  window.location.href = `?l=${language}`;
}
