    // 연혁 섹션: 펼치기 / 접기 (초기 = 전체 콘텐츠 높이의 2/3 노출)
    (function () {
      var section = document.getElementById('history');
      if (!section) return;

      var viewport = document.getElementById('historyContent');
      var content = viewport.querySelector('.history__content');
      var toggle = document.getElementById('historyToggle');
      var label = toggle.querySelector('.history__more-text');
      var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      var VISIBLE_RATIO = 2 / 3;

      function collapsedHeight() {
        return Math.round(content.offsetHeight * VISIBLE_RATIO);
      }

      function isCollapsed() {
        return section.classList.contains('is-collapsed');
      }

      function setState(collapsed) {
        section.classList.toggle('is-collapsed', collapsed);
        toggle.setAttribute('aria-expanded', String(!collapsed));
        label.textContent = collapsed ? '펼치기' : '접기';
      }

      function expand() {
        viewport.style.maxHeight = content.offsetHeight + 'px'; // px → px 라서 transition 동작
        setState(false);
      }

      function collapse() {
        // 펼침 완료 후에는 max-height: none 이므로, 현재 높이를 px 로 고정한 뒤 transition 시작
        viewport.style.maxHeight = viewport.offsetHeight + 'px';
        viewport.getBoundingClientRect(); // reflow 강제
        viewport.style.maxHeight = collapsedHeight() + 'px';
        setState(true);
        // 접힌 뒤 시선이 섹션 하단에 남지 않도록 섹션 상단으로 이동
        section.scrollIntoView({ behavior: reduceMotion.matches ? 'auto' : 'smooth', block: 'start' });
      }

      // 펼침 애니메이션이 끝나면 높이 제한 해제 (이후 리사이즈/폰트 로딩에도 잘리지 않음)
      viewport.addEventListener('transitionend', function (e) {
        if (e.target !== viewport || e.propertyName !== 'max-height') return;
        if (!isCollapsed()) viewport.style.maxHeight = 'none';
      });

      toggle.addEventListener('click', function () {
        if (isCollapsed()) expand();
        else collapse();
      });

      // 콘텐츠 높이가 바뀌면(브레이크포인트 전환, 이미지/폰트 로딩) 2/3 지점을 다시 계산
      function sync() {
        viewport.style.maxHeight = isCollapsed() ? collapsedHeight() + 'px' : 'none';
      }

      setState(true);
      sync();
      if ('ResizeObserver' in window) {
        new ResizeObserver(sync).observe(content);
      } else {
        window.addEventListener('resize', sync);
        window.addEventListener('load', sync);
      }
    })();
