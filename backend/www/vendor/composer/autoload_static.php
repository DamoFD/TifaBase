<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit3c5b0d1e95866aad5c8b0dc4fe420782
{
    public static $prefixLengthsPsr4 = array (
        'T' => 
        array (
            'Tifabase\\' => 9,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Tifabase\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit3c5b0d1e95866aad5c8b0dc4fe420782::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit3c5b0d1e95866aad5c8b0dc4fe420782::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit3c5b0d1e95866aad5c8b0dc4fe420782::$classMap;

        }, null, ClassLoader::class);
    }
}