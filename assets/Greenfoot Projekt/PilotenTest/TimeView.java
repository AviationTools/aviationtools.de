import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class TimeView here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class TimeView extends Actor
{
    private Time time;
    private boolean shouldShow = true;
    
    public TimeView(Time time) {
        this.time = time;
    }
    
    public void act() 
    {
        if (shouldShow) {
            setImage(new GreenfootImage(time.getTime() + " sec", 32, Color.WHITE, Color.BLACK));
        }
    }
    
    public void show(){
        shouldShow = true;
    }
    
    public void hide(){
        shouldShow = false;
    } 
}
