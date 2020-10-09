# sm

1. npm install
2. npm run dev-mac (it will build on pc as well) will build the dist folder and run a local server.
3. index.html is the file you want to look at.
4. The scss could be abstracted to be more readable, I have nested the modifiers using &--blagh to show this way of doing it, I generally dont do this as it becomes harder to mainten and find classes, I done it this way for speed.
5. Transitions - I left them basic to cut bloat, easy enough to add them.
6. couldnt make my mind up whether to use background images for the toggle icons - I went with inline spritesheet svg, benifits to both methods.
7. The verticle line on v1 accordions could prob be done a bit better, at first I tried the psuedo class on the ul, might need some js to get it 100% as per visuals
8. I used BEM on individual elements but I am aware that they could have been targeted by a class higher-up, I know in some situations this is preffered.
9. The organisation of the scss comes - modified a bit for personal taste https://other.media/itcss-the-inverted-triangle-css-the-right-way-up/
10. Also checked in latest Safari,,,, there were a few tweaks needed.
