export const handleOutsideClick = (
	listening,
	setListening,
	dropdownRef,
	setUserActive
) => {
	return () => {
		if (listening) return;
		if (!dropdownRef.current) return;
		setListening(true);
		[`click`, `touchstart`].forEach(type => {
			document.addEventListener(`click`, e => {
				try {
					if (dropdownRef.current.contains(e.target)) return;
					setUserActive(false);
				} catch (error) {
					return null;
				}
			});
		});
	};
};
