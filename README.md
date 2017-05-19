# cleverHome

## Microservices
>
>###### [Door](https://github.com/ruslanbanah/cleverHome/tree/master/microservices/door)
> - Set configuration ````cp config_EXAMPLE.py config.py````
> - Start ````./start.py&````
> * install supervisord
>   - ``apt-get install supervisor``
>   - ``service supervisor restart``
>   - Конфигурационные файлы Supervisor находятся в каталоге ````/etc/supervisor/conf.d```` (как правило, по файлу с расширением .conf на каждую программу). Простая конфигурация для скрипта, сохраненного в ```/etc/supervisor/conf.d/long_script.conf```, будет иметь такой вид:
  ```
  [program:long_script]
      command=/usr/local/bin/long.sh
      autostart=true
      autorestart=true
      stderr_logfile=/var/log/long.err.log
      stdout_logfile=/var/log/long.out.log
  ```
  - ````supervisorctl reread````
  - ````supervisorctl update````
> 
>
>###### [Blinds]()
> 
> 
>

>
>###### [Camera motion]()
> 
> 
>

## WEB
>
> [link](https://github.com/ruslanbanah/cleverHome/tree/master/web)
> 
> 
>