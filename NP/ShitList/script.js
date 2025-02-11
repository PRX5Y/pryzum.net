function toggleProfile(element) {
    if (element.classList.contains('enlarged')) {
        element.classList.remove('enlarged');
        document.body.classList.remove('blurred');
    } else {
        document.querySelectorAll('.profile').forEach(profile => {
            profile.classList.remove('enlarged');
        });
        element.classList.add('enlarged');
        document.body.classList.add('blurred');
    }
}
