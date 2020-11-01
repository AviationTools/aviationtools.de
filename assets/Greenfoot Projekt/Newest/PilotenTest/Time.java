import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class Time here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class Time extends Actor
{
    private double rawTime;
    
    public void act(){
        rawTime = rawTime + 1;
    }
    
    public int getTime(){
        return (int)rawTime/60;
    }
}
